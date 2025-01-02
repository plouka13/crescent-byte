"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export function CompareDrawer({ stock1, stock2 }) {
  const [stockData1, setStockData1] = React.useState(null);
  const [stockData2, setStockData2] = React.useState(null);

  React.useEffect(() => {
    if (stock1) {
      setStockData1(stock1);
    }
    if (stock2) {
      setStockData2(stock2);
    }
  }, [stock1, stock2]);

  const renderStockTable = (stockData1, stockData2) => {
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>{stockData1.longName}</TableHead>
            <TableHead>{stockData2.longName}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Bid</TableCell>
            <TableCell
              className={
                stockData1.bid > stockData2.bid
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {stockData1.bid?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </TableCell>
            <TableCell
              className={
                stockData2.bid > stockData1.bid
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {stockData2.bid?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Ask</TableCell>
            <TableCell
              className={
                stockData1.ask > stockData2.ask
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {stockData1.ask?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </TableCell>
            <TableCell
              className={
                stockData2.ask > stockData1.ask
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {stockData2.ask?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Regular Market Price</TableCell>
            <TableCell
              className={
                stockData1.regularMarketPrice > stockData2.regularMarketPrice
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {stockData1.regularMarketPrice?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </TableCell>
            <TableCell
              className={
                stockData2.regularMarketPrice > stockData1.regularMarketPrice
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {stockData2.regularMarketPrice?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Regular Market Day High</TableCell>
            <TableCell
              className={
                stockData1.regularMarketDayHigh >
                stockData2.regularMarketDayHigh
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {stockData1.regularMarketDayHigh?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </TableCell>
            <TableCell
              className={
                stockData2.regularMarketDayHigh >
                stockData1.regularMarketDayHigh
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {stockData2.regularMarketDayHigh?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Regular Market Day Low</TableCell>
            <TableCell
              className={
                stockData1.regularMarketDayLow > stockData2.regularMarketDayLow
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {stockData1.regularMarketDayLow?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </TableCell>
            <TableCell
              className={
                stockData2.regularMarketDayLow > stockData1.regularMarketDayLow
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {stockData2.regularMarketDayLow?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Regular Market Volume</TableCell>
            <TableCell
              className={
                stockData1.regularMarketVolume > stockData2.regularMarketVolume
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {formatLargeNumber(stockData1.regularMarketVolume)}
            </TableCell>
            <TableCell
              className={
                stockData2.regularMarketVolume > stockData1.regularMarketVolume
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {formatLargeNumber(stockData2.regularMarketVolume)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Market Cap</TableCell>
            <TableCell
              className={
                stockData1.marketCap > stockData2.marketCap
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {formatLargeNumber(stockData1.marketCap)}
            </TableCell>
            <TableCell
              className={
                stockData2.marketCap > stockData1.marketCap
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {formatLargeNumber(stockData2.marketCap)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>52 Week High</TableCell>
            <TableCell
              className={
                stockData1.fiftyTwoWeekHigh > stockData2.fiftyTwoWeekHigh
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {stockData1.fiftyTwoWeekHigh?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </TableCell>
            <TableCell
              className={
                stockData2.fiftyTwoWeekHigh > stockData1.fiftyTwoWeekHigh
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {stockData2.fiftyTwoWeekHigh?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>52 Week Low</TableCell>
            <TableCell
              className={
                stockData1.fiftyTwoWeekLow > stockData2.fiftyTwoWeekLow
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {stockData1.fiftyTwoWeekLow?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </TableCell>
            <TableCell
              className={
                stockData2.fiftyTwoWeekLow > stockData1.fiftyTwoWeekLow
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {stockData2.fiftyTwoWeekLow?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  };
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Overall comparison</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-4xl">
          <DrawerHeader>
            <DrawerTitle>Stock Comparison</DrawerTitle>
            <DrawerDescription>
              Compare the performance and data of two stocks.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            {stockData1 && stockData2 ? (
              <div>{renderStockTable(stockData1, stockData2)}</div>
            ) : (
              <Skeleton className="h-64" />
            )}
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
