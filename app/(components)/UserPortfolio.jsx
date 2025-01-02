"use client";
import React from "react";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import HeaderBar from "./HeaderBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { useSession } from "next-auth/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
};

export const UserPortfolio = () => {
  const { data: session, status } = useSession();
  const [userBalance, setUserBalance] = useState(0);
  const [userHoldingValue, setUserHoldingValue] = useState(0);
  const [totalDividendReturn, setTotalDividendReturn] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [holdings, setHoldings] = useState([]);
  const [previousBuys, setPreviousBuys] = useState([]);
  const [previousSells, setPreviousSells] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (session && session?.user) {
        const tempHoldings = session?.user.curr_holdings || [];
        const tempPreviousBuys = session?.user.curr_inv || [];
        const tempPreviousSells = session?.user.prev_inv || [];
        const holdingsWithInfo = await Promise.all(
          tempHoldings.map(async (holding) => {
            const response = await fetch(
              `api/info?symbol=${encodeURIComponent(holding.stock)}`
            );
            if (response.ok) {
              const { data } = await response.json();
              if (data && data.body) {
                const bodyValue = JSON.parse(data.body);
                const stockInfo = {
                  symbol: bodyValue.symbol,
                  longName: bodyValue.longName,
                  regularMarketPrice: bodyValue.currentPrice,
                  dividendRate: bodyValue.dividendRate,
                };
                return { ...holding, ...stockInfo };
              }
            }
            return holding;
          })
        );

        const totalHoldingValue = holdingsWithInfo.reduce(
          (total, holding) =>
            total + holding.amount * holding.regularMarketPrice,
          0
        );
        const totalDividendReturn = holdingsWithInfo.reduce(
          (total, holding) =>
            total + (holding.amount * holding?.dividendRate || 0),
          0
        );

        setHoldings(holdingsWithInfo);
        setPreviousBuys(tempPreviousBuys);
        setPreviousSells(tempPreviousSells);
        setUserBalance(session?.user.balance || 0);
        setUserHoldingValue(totalHoldingValue);
        setTotalDividendReturn(totalDividendReturn);
        setTotalBalance(totalHoldingValue + (session?.user.balance || 0));
      }
    };

    fetchUserData();
  }, [session]);

  return (
    <div>
      <HeaderBar pageName="Portfolio" />
      <div className="pb-8">
        <div className="shadow-lg rounded-lg p-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold">
                Hey, {session?.user?.name || "Loading"}
              </h2>
              <p>Lets dive into your portfolio!</p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  User Balance
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {userBalance.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  User Holding Value
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {userHoldingValue.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Dividend Return
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {totalDividendReturn.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Value
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {totalBalance.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="mb-8">
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue="holdings"
            >
              <AccordionItem value="holdings">
                <AccordionTrigger>Holdings</AccordionTrigger>
                <AccordionContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Total Value</TableHead>
                        <TableHead>Total Dividend</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {holdings.map((holding, index) => (
                        <TableRow key={index}>
                          <TableCell>{holding.longName}</TableCell>
                          <TableCell>{holding.amount}</TableCell>
                          <TableCell>
                            $
                            {(
                              holding.amount * holding.regularMarketPrice
                            ).toFixed(2)}
                          </TableCell>
                          <TableCell>
                            $
                            {(
                              holding.amount * holding?.dividendRate || 0
                            ).toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="previous-buys">
                <AccordionTrigger>Previous Buys</AccordionTrigger>
                <AccordionContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Stock</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Buy Date</TableHead>
                        <TableHead>Value per stock</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {previousBuys.map((buy, index) => (
                        <TableRow key={index}>
                          <TableCell>{buy.stock}</TableCell>
                          <TableCell>{buy.amount.$numberDecimal}</TableCell>
                          <TableCell>{formatDate(buy.buy_date)}</TableCell>
                          <TableCell>
                            ${buy.stock_value.$numberDecimal}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="previous-sells">
                <AccordionTrigger>Previous Sells</AccordionTrigger>
                <AccordionContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Stock</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Sell Date</TableHead>
                        <TableHead>Value per stock</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {previousSells.map((sell, index) => (
                        <TableRow key={index}>
                          <TableCell>{sell.stock}</TableCell>
                          <TableCell>{sell.amount.$numberDecimal}</TableCell>
                          <TableCell>{formatDate(sell.sell_date)}</TableCell>
                          <TableCell>
                            ${sell.stock_value.$numberDecimal}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};
