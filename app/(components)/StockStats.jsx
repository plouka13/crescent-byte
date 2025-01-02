"use client";
import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Skeleton } from "@/components/ui/skeleton";

export const StockStats = ({ mainStock }) => {
  const [stockData, setStockData] = useState(null);
  useEffect(() => {
    setStockData(mainStock);
  }, [mainStock]);

  const formatLargeNumber = (number) => {
    const trillion = 1e12;
    const billion = 1e9;
    const million = 1e6;

    if (number >= trillion) {
      return `$${(number / trillion).toFixed(1)}T`;
    } else if (number >= billion) {
      return `$${(number / billion).toFixed(1)}B`;
    } else if (number >= million) {
      return `$${(number / million).toFixed(1)}M`;
    } else {
      return number?.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    }
  };

  return (
    <div className="">
      {stockData ? (
        <Card className="">
          <CardHeader className="flex flex-row items-start bg-muted/50">
            <div className="grid gap-0.5">
              <div className="flex flex-row center">
                <CardTitle className="text-lg">{stockData.symbol}</CardTitle>
                <Dialog className="">
                  <DialogTrigger asChild className="pt-1 pl-1">
                    <div className="hover:cursor-pointer">
                      <QuestionMarkCircledIcon className="h-5 w-5" />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="">
                    <Dialog className="flex flex-row items-start bg-muted/50 p-2">
                      <div className="grid gap-0.5">
                        <DialogTitle className="text-lg">
                          {stockData.longName}
                        </DialogTitle>
                        <DialogDescription>
                          {stockData.industry} - {stockData.sector}
                        </DialogDescription>
                      </div>
                    </Dialog>
                    <ScrollArea className="h-24">
                      <CardContent className="p-3 text-sm">
                        {stockData.longBusinessSummary}
                      </CardContent>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </div>
              <CardTitle>
                {stockData.regularMarketPrice?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </CardTitle>
              <CardDescription>{stockData.industry}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-6 text-sm">
            <div className="grid gap-3">
              <div className="font-semibold">Latest Bid/Ask</div>
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Bid</span>
                  <span>
                    {stockData.bid?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }) || "N/A"}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Bid Amount</span>
                  <span>{stockData.bidSize || "N/A"}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Ask</span>
                  <span>
                    {stockData.ask?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }) || "N/A"}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Ask Amount</span>
                  <span>{stockData.askSize || "N/A"}</span>
                </li>
              </ul>
              <Separator className="my-2" />
              <div className="font-semibold">Range</div>
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Day</span>
                  <span>
                    {stockData.regularMarketDayLow?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    -{" "}
                    {stockData.regularMarketDayHigh?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">52W</span>
                  <span>
                    {stockData.fiftyTwoWeekLow?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    -{" "}
                    {stockData.fiftyTwoWeekHigh?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </li>
              </ul>
              <Separator className="my-2" />
              <div className="font-semibold">Key Statistics</div>
              <ScrollArea className="h-36">
                <ul className="grid gap-3 pt-1">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Volume</span>
                    <span>
                      {formatLargeNumber(stockData.regularMarketVolume)}
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Avg Volume (10W)
                    </span>
                    <span>
                      {formatLargeNumber(stockData.averageVolume10days)}
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Market Cap</span>
                    <span>{formatLargeNumber(stockData.marketCap)}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Price to Book</span>
                    <span>
                      {stockData.priceToBook?.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Dividend Yield
                    </span>
                    <span>
                      {stockData.dividendYield?.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 4,
                        maximumFractionDigits: 4,
                      }) || "N/A"}
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Dividend Rate</span>
                    <span>
                      {stockData.dividendRate?.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 4,
                        maximumFractionDigits: 4,
                      }) || "N/A"}
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Payout Ratio</span>
                    <span>
                      {stockData.payoutRatio?.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 4,
                        maximumFractionDigits: 4,
                      }) || "N/A"}
                    </span>
                  </li>
                </ul>
              </ScrollArea>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-start bg-muted/50">
            <div className="grid gap-0.5">
              <Skeleton className="h-4 w-1/2 mb-2" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-4/5 mb-2" />
            <Skeleton className="h-4 w-3/5" />
          </CardContent>
        </Card>
      )}
    </div>
  );
};
