import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { Skeleton } from "@/components/ui/skeleton";
import { generateDateRangeArray } from "@/app/utils/helper";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";

const MetricChart = ({ metrics, metricsRequest }) => {
  const [rsi, setRsi] = useState(null);
  const [sma, setSma] = useState(null);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  // Stores the current graphs displayed
  const [displayEMA, setDisplayEMA] = useState(false);
  const [displayMACD, setDisplayMACD] = useState(true);

  useEffect(() => {
    if (metrics) {
      const metricsObj = JSON.parse(metrics);
      setRsi(metricsObj["RSI"].toFixed(2));
      setSma(metricsObj["SMA"].toFixed(2));
    }
  }, [metrics]);

  useEffect(() => {
    const ctx = chartRef.current;
    if (!ctx) return;

    const metricsObj = metrics ? JSON.parse(metrics) : null;
    const emaData = metricsObj ? metricsObj["EMA"] : [];
    const histogramData = metricsObj ? metricsObj["MACD"]["Histogram"] : [];
    const macdData = metricsObj ? metricsObj["MACD"]["MACD Line"] : [];
    const signalData = metricsObj ? metricsObj["MACD"]["Signal Line"] : [];
    let dateArray = Array.from(Array(histogramData.length).keys());
    if (metrics) {
      const startDate = metricsRequest.start_date;
      const endDate = metricsRequest.end_date;
      dateArray = generateDateRangeArray(startDate, endDate);
    }

    if (!chartInstanceRef.current) {
      chartInstanceRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: dateArray.slice(0, histogramData.length),
          datasets: [
            {
              label: "Histogram",
              data: histogramData,
              type: "bar",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
              hidden: !displayMACD,
            },
            {
              label: "MACD line",
              data: macdData,
              type: "line",
              fill: false,
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 2,
              hidden: !displayMACD,
            },
            {
              label: "Signal Line",
              data: signalData,
              type: "line",
              fill: false,
              borderColor: "rgba(255, 206, 86, 1)",
              borderWidth: 2,
              hidden: !displayMACD,
            },
            {
              label: "EMA",
              data: emaData,
              type: "line",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
              hidden: !displayEMA, // Hide or show based on displayEMA state
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              title: {
                display: true,
                text: "Metrics",
              },
            },
          },
        },
      });
    } else {
      chartInstanceRef.current.data.datasets[0].data = histogramData;
      chartInstanceRef.current.data.datasets[1].data = macdData;
      chartInstanceRef.current.data.datasets[2].data = signalData;
      chartInstanceRef.current.update();
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [metrics]);

  return (
    <div>
      <Card className="mb-4 border-none">
        <CardHeader className="mt-0 pt-1 pl-1">
          <div className="flex items-center">
            <CardTitle className="text-2xl font-bold pr-1">Metrics </CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <div className="hover:cursor-pointer">
                  <QuestionMarkCircledIcon className="h-5 w-5" />
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>
                    Moving average convergence/divergence MACD
                  </DialogTitle>
                  <DialogDescription>
                    A bar that shows the association between two moving averages
                    of a securitys price to track trend momentum
                  </DialogDescription>
                  <DialogTitle>Relative Strength Index (RSI)</DialogTitle>
                  <DialogDescription>
                    Measures the speed and change of the price movements to
                    identify overbought or oversold conditions in a stock. An
                    RSI greater then 70 indicates it might be overbought. While
                    an RSI under then 40 indicates it might be underbought
                  </DialogDescription>
                  <DialogTitle>SMA (Simple Moving Average)</DialogTitle>
                  <DialogDescription>
                    This is simply the average of the stock price over a
                    specific period.
                  </DialogDescription>
                  <DialogTitle>EMA (Exponential Moving Average)</DialogTitle>
                  <DialogDescription>
                    The EMA gives more weight to more recent prices, making it
                    more responsive to new information. The key difference to
                    note here is that the EMA also takes into account a specific
                    period (20 days here), but it applies a weighting multiplier
                    to more recent prices.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <CardDescription>RSI: {rsi ? rsi : "Loading"}</CardDescription>
          <CardDescription>SMA: {sma ? sma : "Loading"}</CardDescription>
        </CardHeader>
      </Card>
      {metrics ? (
        <canvas ref={chartRef} />
      ) : (
        <div className="w-full h-80 flex items-center justify-center">
          <Skeleton className="w-full h-full" />
        </div>
      )}
    </div>
  );
};

export default MetricChart;
