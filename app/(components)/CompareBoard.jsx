"use client";
import React, { useState, useEffect } from "react";
import { SkeletonCardLong } from "./SkeletonCardLong";
import { SelectStock } from "./SelectStock";
import { CompareInstructions } from "./CompareInstructions";
import { StockStats } from "./StockStats";
import StockTicker from "./StockTicker";

const getCurrData = async (stockSymbol) => {
  let tempName = stockSymbol;
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

export const CompareBoard = () => {
  const [selectedStock1, setSelectedStock1] = useState(null);
  const [selectedStock2, setSelectedStock2] = useState(null);
  const [stockData1, setStockData1] = useState(null);
  const [stockData2, setStockData2] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStockData = async () => {
      if (selectedStock1) {
        try {
          const data = await getCurrData(selectedStock1);
          console.log(data);
          setStockData1(data);
        } catch (error) {
          setError(
            "Failed to fetch stock data for the first stock. Please try again."
          );
        }
      } else {
        console.log("DIDNT WAIT LUL");
        setStockData1(null);
      }
    };

    fetchStockData();
  }, [selectedStock1]);

  useEffect(() => {
    const fetchStockData = async () => {
      if (selectedStock2) {
        try {
          const data = await getCurrData(selectedStock2);
          console.log(data);
          setStockData2(data);
        } catch (error) {
          setError(
            "Failed to fetch stock data for the second stock. Please try again."
          );
        }
      } else {
        console.log("DIDNT WAIT LUL");
        setStockData2(null);
      }
    };

    fetchStockData();
  }, [selectedStock2]);

  const handleStockSelect1 = (value) => {
    console.log(value);
    setSelectedStock1(value);
  };

  const handleStockSelect2 = (value) => {
    console.log(value);
    setSelectedStock2(value);
  };

  return (
    <div>
      <div className="w-11/12 m-auto">
        <CompareInstructions stock1={stockData1} stock2={stockData2} />
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="flex flex-row justify-center gap-4">
        <div className="flex flex-col pt-2 gap-3 w-6/12 pl-4">
          <div className="mx-auto">
            <SelectStock onSelect={handleStockSelect1} />
          </div>
          {stockData2 ? (
            <div className="flex flex-row">
              <div className="w-8/12">
                <StockTicker
                  mainStock={stockData1?.symbolLong || "NASDAQ:AAPL"}
                />
              </div>
              <div className="w-4/12 pl-3 mx-auto">
                <StockStats mainStock={stockData1} />
              </div>
            </div>
          ) : (
            <div className="mx-auto">
              <SkeletonCardLong />
            </div>
          )}
        </div>
        <div className="flex flex-col pt-2 gap-3 w-6/12 pr-4">
          <div className="mx-auto">
            <SelectStock onSelect={handleStockSelect2} />
          </div>
          {stockData2 ? (
            <div className="flex flex-row">
              <div className="w-8/12">
                <StockTicker
                  mainStock={stockData2?.symbolLong || "NASDAQ:AAPL"}
                />{" "}
              </div>
              <div className="w-4/12 pl-3 mx-auto">
                <StockStats mainStock={stockData2} />
              </div>
            </div>
          ) : (
            <div className="mx-auto">
              <SkeletonCardLong />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
