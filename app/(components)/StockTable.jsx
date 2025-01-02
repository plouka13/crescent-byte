"use client";

import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import { useSession } from "next-auth/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteBlock from "./DeleteBlock";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// might want to use useMemo to ensure some things dont get rerendered.
// looking into how to improve code style here
import { ScrollArea } from "@/components/ui/scroll-area";
import { MarketToggle } from "./MarketToggle";
import HoldingsCell from "./HoldingsCell";

const getCurrData = async (stockSymbol) => {
  let tempName = stockSymbol;
  if (stockSymbol.split(":")[0] == "ASX") {
    tempName = stockSymbol.split(":")[1];
    tempName = `${tempName}.AX`;
  } else if (stockSymbol.split(":")[0] == "NASDAQ") {
    tempName = stockSymbol.split(":")[1];
  } else {
    tempName = stockSymbol;
  }
  const response = await fetch(
    `api/info?symbol=${encodeURIComponent(tempName)}`
  );
  if (response.ok) {
    const { data } = await response.json();
    if (data && data.body) {
      const bodyValue = JSON.parse(data.body);
      const stockInfo = {
        symbol: bodyValue.symbol,
        longName: bodyValue.longName,
        bid: bodyValue.bid,
        bidSize: bodyValue.bidSize,
        ask: bodyValue.ask,
        askSize: bodyValue.askSize,
        regularMarketPrice: bodyValue.currentPrice,
        regularMarketDayHigh: bodyValue.regularMarketDayHigh,
        regularMarketDayLow: bodyValue.regularMarketDayLow,
        regularMarketVolume: bodyValue.regularMarketVolume,
        marketCap: bodyValue.marketCap,
        fiftyTwoWeekHigh: bodyValue.fiftyTwoWeekHigh,
        fiftyTwoWeekLow: bodyValue.fiftyTwoWeekLow,
        industry: bodyValue.industry,
        sector: bodyValue.sector,
        averageVolume10days: bodyValue.averageVolume10days,
        beta: bodyValue.beta,
        floatShares: bodyValue.floatShares,
        priceToBook: bodyValue.priceToBook,
        exchange: bodyValue.exchange,
        dividendRate: bodyValue.dividendRate,
        dividendYield: bodyValue.dividendYield,
        payoutRatio: bodyValue.payoutRatio,
        longBusinessSummary: bodyValue.longBusinessSummary,
      };
      if (stockInfo.exchange === "NMS") {
        let tempStockSymbol = `NASDAQ:${stockInfo.symbol}`;
        stockInfo.symbolLong = tempStockSymbol;
      } else if (stockInfo.exchange === "ASX") {
        let tempStockSymbol = `ASX:${stockInfo.symbol.split(".")[0]}`;
        stockInfo.symbolLong = tempStockSymbol;
      } else if (stockInfo.exchange === "CCC") {
        let tempStockSymbol = stockInfo.symbol.replace("-", "");
        stockInfo.symbolLong = tempStockSymbol;
      } else if (stockInfo.exchange === "CCY") {
        let tempStockSymbol = stockInfo.symbol.split("=")[0];
        stockInfo.symbolLong = tempStockSymbol;
      }
      return stockInfo;
    }
  } else {
    console.error("Error:", response.status);
  }
};

const StockTable = ({ mainStock }) => {
  const [selectedMarket, setSelectedMarket] = useState("NMS");
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session, status, update } = useSession();
  const setSelectedStock = mainStock;
  const [holdings, setHoldings] = useState([]);
  const handleStockClick = (stockName) => {
    setSelectedStock(stockName);
    console.log("CHANGED");
  };

  let allStocks = session?.user?.stocks;

  useEffect(() => {
    if (session) {
      let tempHoldings = session.user?.curr_holdings || [];
      setHoldings(tempHoldings);
    }
  }, [session]);

  useEffect(() => {
    const fetchStockData = async () => {
      setLoading(true);
      setError(null);

      try {
        const promises = allStocks?.map((stock) => getCurrData(stock));
        if (Array.isArray(promises)) {
          const data = await Promise.all(promises);
          const filteredData = data.filter((item) => item !== undefined);
          const marketFilteredData = filteredData.filter(
            (item) => item.exchange === selectedMarket
          );
          setStockData(marketFilteredData);
          if (marketFilteredData.length > 0) {
            setSelectedStock(marketFilteredData[0]);
          }
        }
      } catch (error) {
        setError("Failed to fetch stock data. Please try again.");
      }

      setLoading(false);
    };

    fetchStockData();
  }, [allStocks, setSelectedStock, selectedMarket]);

  return (
    <div className="">
      <Card>
        <CardHeader className="px-7">
          <div className="flex flex-row items-center justify-between">
            <CardTitle>Your Watchlist</CardTitle>
            <MarketToggle
              selectedMarket={selectedMarket}
              setSelectedMarket={setSelectedMarket}
            />
            <SearchBar />
          </div>
          <CardDescription>Stocks you are currently watching.</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-56">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Stock</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead className="hidden sm:table-cell pr-2">
                    Holding
                  </TableHead>
                  <TableHead className="hidden md:table-cell pr-2">
                    Delete
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5}>Loading...</TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell colSpan={5}>{error}</TableCell>
                  </TableRow>
                ) : stockData.length > 0 ? (
                  stockData.map((ticket, index) => (
                    <TableRow
                      key={index}
                      onClick={() => handleStockClick(ticket)}
                      className="cursor-pointer"
                    >
                      <TableCell>
                        <div className="font-medium">{ticket.symbol}</div>
                      </TableCell>
                      <TableCell>
                        {ticket.regularMarketPrice?.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </TableCell>
                      <TableCell
                        onClick={(e) => e.stopPropagation()}
                        className="hidden sm:table-cell pr-2"
                      >
                        <HoldingsCell stockSymbol={ticket.symbol} />
                      </TableCell>
                      <TableCell
                        onClick={(e) => e.stopPropagation()}
                        className="hidden md:table-cell pl-8 pr-2"
                      >
                        <DeleteBlock
                          id={ticket.symbolLong}
                          id2={ticket.symbol}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5}>No stocks available</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default StockTable;
