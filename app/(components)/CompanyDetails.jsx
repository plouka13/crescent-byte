"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export const CompanyDetails = ({ mainStock }) => {
  const [stockData, setStockData] = useState(null);
  useEffect(() => {
    setStockData(mainStock);
    console.log(mainStock);
  }, [mainStock]);

  return (
    <div className="p-0 overflow-hidden">
      {stockData ? (
        <Card className="">
          <CardHeader className="flex flex-row items-start bg-muted/50 p-2">
            <div className="grid gap-0.5">
              <CardTitle className="text-lg">{stockData.longName}</CardTitle>
              <CardDescription>
                {stockData.industry} - {stockData.sector}
              </CardDescription>
            </div>
          </CardHeader>
          <ScrollArea className="h-24">
            <CardContent className="p-3 text-sm">
              {stockData.longBusinessSummary}
            </CardContent>
          </ScrollArea>
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-start bg-muted/50">
            <div className="grid gap-0.5">
              <CardTitle className="text-lg">Loading</CardTitle>
              <CardDescription>Loading</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-6 text-sm"></CardContent>
        </Card>
      )}
    </div>
  );
};
