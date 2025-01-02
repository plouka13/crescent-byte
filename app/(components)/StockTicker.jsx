"use client";
// The error we get is widget checks for the existance of of the original div
// Our useEffect removes all divs from it resulting in the error
// If anyone finds a way to keep it then nice if not gg the error doesnt actually impact anything
import { useTheme } from "next-themes";
import React, { useEffect, useRef, memo } from "react";

function TradingViewWidget({ mainStock }) {
  const container = useRef();
  const { theme } = useTheme();

  useEffect(() => {
    const script = document.createElement("script");
    console.log(mainStock);
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "autosize": true,
          "symbol": "${mainStock}",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "${theme === "light" ? "light" : "dark"}",
          "style": "1",
          "locale": "en",
          "enable_publishing": false,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        }`;
    const widgetContainer = document.createElement("div");
    widgetContainer.className = "";
    widgetContainer.style.height = "97%";
    widgetContainer.style.width = "100%";

    while (container.current.firstChild) {
      container.current.removeChild(container.current.firstChild);
    }

    widgetContainer.appendChild(script);
    container.current.appendChild(widgetContainer);
  }, [mainStock, theme]);

  return (
    <div
      className="tradingview-widget-container m-1 mt-0 ml-0"
      ref={container}
      style={{ height: "97%", width: "100%" }}
    ></div>
  );
}

export default memo(TradingViewWidget);
