"use client";
import React, { useEffect, useState } from "react";
import HeaderBar from "./HeaderBar";
import { Button } from "@/components/ui/button";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import NewsBlock from "./analysis/NewsBlock";
import InsightBlock from "./analysis/InsightBlock";
import SentimentGauge from "./analysis/SentimentGauge";
import MetricChart from "./analysis/MetricChart";
// import SelectAnalysisStock from "./analysis/SelectAnalysisStock";
// import AnalysisAlert from "./analysis/AnalysisAlert";
import { Separator } from "@/components/ui/separator";

// import { Cross1Icon } from "@radix-ui/react-icons";
import { AnalysisInstructions } from "./analysis/AnalysisInstructions";

export const StockAnalytics = () => {
  const [newsList, setNewsList] = useState([]);
  const [sentiment, setSentiment] = useState(0);
  const [metrics, setMetrics] = useState("");
  const [metricsRequest, setMetricsRequest] = useState("");
  const [selectedSymbol, setSymbol] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertDescription, setAlertDescription] = useState("");

  const getStockNews = async (symbol) => {
    try {
      const response = await fetch(
        `api/news?symbol=${encodeURIComponent(symbol)}`
      );
      const data = await response.json();
      const articles = data["data"]["events"];
      setNewsList(articles);
    } catch (error) {
      setAlertTitle("Error");
      setAlertDescription(
        "There was an error retrieving news for the stock: ",
        selectedSymbol
      );
      setShowAlert(true);
      console.error("Error invoking API route:", error);
      throw error;
    }
  };

  const getStockSentiment = async (companyName) => {
    const articleUrls = newsList.map((event) => event.attribute.link);
    const requestData = {
      url: articleUrls,
      company: companyName,
    };
    try {
      const response = await fetch("/api/sentiment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      const data = await response.json();
      setSentiment(data["data"]["average"]);
    } catch (error) {
      setAlertTitle("Error");
      setAlertDescription(
        "There was an error retrieving sentiment for the stock: ",
        selectedSymbol
      );
      setShowAlert(true);
      console.error("Error invoking Stock sentiment route:", error);
      throw error;
    }
  };

  useEffect(() => {
    const formatDate = (date) => {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    };
    const currentDate = new Date();
    const yesterday = new Date(currentDate);
    yesterday.setDate(currentDate.getDate() - 1);
    const twoMonthAgo = new Date(currentDate);
    twoMonthAgo.setMonth(currentDate.getMonth() - 2);
    let newMetricsRequest = {
      symbol: selectedSymbol,
      start_date: formatDate(twoMonthAgo),
      end_date: formatDate(yesterday),
      SMA_enabled: true,
      EMA_enabled: true,
      EMA_period: 20,
      RSI_enabled: true,
      RSI_period: 14,
      MACD_enabled: true,
    };
    setMetricsRequest(newMetricsRequest);
  }, [selectedSymbol]);

  const getStockMetrics = async () => {
    try {
      const queryString = Object.entries(metricsRequest)
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join("&");

      const response = await fetch(`api/metrics?${queryString}`);
      const data = await response.json();
      if (data["EMA"]) {
        setMetrics(JSON.stringify(data));
      } else {
        console.log(data);
        setAlertTitle("Error");
        setAlertDescription(
          "There was an error retrieving metrics data for the stock: ",
          selectedSymbol
        );
        setShowAlert(true);
        setMetrics("");
      }
    } catch (error) {
      console.error("Error invoking metrics Route:", error);
      throw error;
    }
  };

  const handleSentimentFetch = async () => {
    const name = await getCompanyName(selectedSymbol);
    // getStockSentiment("Apple");
    getStockSentiment(name);
    // setSentiment("0.5");
  };

  const handleMetricsClick = () => {
    // Used for debugging
    // getStockMetrics("AAPL");
    getStockMetrics(selectedSymbol);
  };

  const handleNewsFetch = () => {
    // Used for debugging
    getStockNews(selectedSymbol);
  };

  const getCompanyName = async (symbol) => {
    const response = await fetch(
      `api/info?symbol=${encodeURIComponent(symbol)}`
    );
    if (response.ok) {
      const { data } = await response.json();
      if (data && data.body) {
        const bodyValue = JSON.parse(data.body);
        return bodyValue.longName.match(/^\w+/)[0];
      }
    }
  };

  /**
   * Retrieve news articles, metrics and insights. Sentiment will be
   * automaticall updated in a useEffect for newsList below
   */
  const fetchEverything = async () => {
    if (selectedSymbol === "") {
      setAlertTitle("Error");
      setAlertDescription(
        "Please select a stock from the options in the dropdown"
      );
      setShowAlert(true);
    } else {
      // Close the alert if a valid stock as been selected
      setShowAlert(false);
      // Dont await stockMetrics, as thereare no subsequent operations
      getStockMetrics(selectedSymbol);
      // Await stock news, as we need the articles before analyzing sentiment
      await getStockNews(selectedSymbol);
    }
  };

  useEffect(() => {
    // Only get sentiment if news articles ahve already been retrieved
    if (newsList.length !== 0 && selectedSymbol !== "") {
      handleSentimentFetch();
    }
  }, [newsList]);

  return (
    <div>
      <HeaderBar pageName="Analytics" />
      <AnalysisInstructions
        onSelect={setSymbol}
        fetchEverything={fetchEverything}
      />
      <Dialog open={showAlert} onOpenChange={setShowAlert}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{alertTitle}</DialogTitle>
            <DialogDescription>{alertDescription}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAlert(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <SentimentGauge sentiment={sentiment} />
          <NewsBlock newsList={newsList} />
        </div>
        <div
          className="rounded-lg p-3 border border-solid m-3 mr-5"
          style={{ width: "100%" }}
        >
          <div className="">
            <MetricChart metrics={metrics} metricsRequest={metricsRequest} />
          </div>
          <Separator className="my-4" />
          <div>
            <InsightBlock
              metrics={metrics}
              symbol={selectedSymbol}
              metricsRequest={metricsRequest}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
