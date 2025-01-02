import React, { useEffect, useState, useCallback } from "react";

// import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Insights = ({ metrics, symbol, metricsRequest }) => {
  // const [insightData, setInsightsData] = useState('');
  const [intro, setIntro] = useState("");
  const [sma, setSma] = useState("");
  const [ema, setEma] = useState("");
  const [rsi, setRsi] = useState("");
  const [macd, setMacd] = useState("");
  const [other, setOther] = useState("");
  const [disclaimer, setDisclaimer] = useState("");

  const getInsights = async (metricsObj) => {
    const requestData = {
      preprocessingInput: metricsRequest,
      preprocessingOutput: metricsObj,
    };
    try {
      const response = await fetch("/api/insights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      const data = await response.json();
      const insightsStr = data.data.data;

      // Render the insights int the accordian
      const items = insightsStr.split("\n\n");
      if (items) {
        renderInsights(items);
      }
    } catch (error) {
      console.error("Error invoking Stock insights route:", error);
      throw error;
    }
  };

  // Used for debugging
  // const retrieveInsights = () => {
  //   const metricsObj = JSON.parse(metrics);
  //   getInsights(metricsObj);
  //   // const testData = "Based on the provided financial metrics for TSLA stock for the period from 07-05-2023 to 15-09-2023, here are some insights:\n\n1. Simple Moving Average (SMA): The SMA value is 81.51784350825099. The SMA represents the average closing price over a specific time period. It can be used to identify the overall trend of the stock.\n\n2. Exponential Moving Average (EMA): The EMA values range from 62.679533386239996 to 96.64541327068275. The EMA is a weighted moving average that assigns more weight to recent prices. It is useful for identifying short-term price trends and potential reversal points.\n\n3. Relative Strength Index (RSI): The RSI value is 56.46882248969012. RSI is a momentum oscillator that measures the speed and change of price movements. A value above 70 indicates overbought conditions, while a value below 30 indicates oversold conditions. The RSI value of 56.46882248969012 suggests that the stock is neither overbought nor oversold.\n\n4. Moving Average Convergence Divergence (MACD): The MACD is a trend-following indicator that consists of a MACD Line, Signal Line, and Histogram. The MACD Line ranges from -4.1017900613647384 to 3.923976262394561. When the MACD Line crosses above the Signal Line, it may signal a bullish trend, and vice versa. The Histogram represents the difference between the MACD Line and Signal Line.\n\nBased on these metrics, it appears that TSLA stock experienced some fluctuations during the given period. The SMA, EMA, RSI, and MACD provide different perspectives on the stock's price and momentum. However, it is important to note that these metrics are historical and cannot predict future performance with certainty. To make investment decisions, it is recommended to analyze additional factors such as fundamental analysis, market conditions, and news surrounding the stock. Consulting with a financial advisor is also advisable.\n\nDisclaimer: This analysis is not financial advice but a general observation of the provided metrics. Investment decisions should be made based on thorough research and understanding of the market."
  //   // const items = testData.split("\n\n");
  //   // console.log(items);
  //   // renderInsights(items);
  //   // setInsightsData(testData);
  // };

  const retrieveInsights = useCallback(() => {
    const metricsObj = JSON.parse(metrics);
    getInsights(metricsObj);
  }, [metrics]);

  const renderInsights = (items) => {
    setIntro(items[0]);
    setSma(items[1]);
    setEma(items[2]);
    setRsi(items[3]);
    setMacd(items[4]);
    setOther(items[5]);
    setDisclaimer(items[6]);
  };

  useEffect(() => {
    if (metrics) {
      retrieveInsights();
    }
  }, [metrics, retrieveInsights]);
  return (
    <>
      <h2 className="text-2xl font-bold">Insights</h2>
      {/* <Button onClick={retrieveInsights}>Get insights</Button> // USED FOR DEBUGGING*/}
      {/* <p>{intro}</p> */}
      <Accordion type="single" collapsible>
        <AccordionItem value="sma">
          <AccordionTrigger>SMA: Simple Moving Average</AccordionTrigger>
          <AccordionContent>
            <p>{sma}</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="ema">
          <AccordionTrigger>EMA: Exponential Moving Average</AccordionTrigger>
          <AccordionContent>
            <p>{ema}</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="rsi">
          <AccordionTrigger>RSI: Relative Strength Index</AccordionTrigger>
          <AccordionContent>
            <p>{rsi}</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="macd">
          <AccordionTrigger>
            MACD: Moving Average Convergence Divergence
          </AccordionTrigger>
          <AccordionContent>
            <p>{macd}</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="other">
          <AccordionTrigger>Other</AccordionTrigger>
          <AccordionContent>
            <p>{other}</p>
            <p>{disclaimer}</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default Insights;
