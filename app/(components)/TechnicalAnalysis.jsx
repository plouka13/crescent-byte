"use client";
// The error we get is widget checks for the existance of of the original div
// Our useEffect removes all divs from it resulting in the error
// If anyone finds a way to keep it then nice if not gg the error doesnt actually impact anything

import React, { useEffect, useRef, memo } from "react";

function TechnicalAnalysis({ mainStock }) {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";
    script.async = true;
    script.innerHTML = `{
      "interval": "1m",
      "width": 425,
      "isTransparent": false,
      "height": 450,
      "symbol": "${mainStock}",
      "showIntervalTabs": true,
      "displayMode": "single",
      "locale": "en",
      "colorTheme": "dark"
    }`;
    while (container.current.firstChild) {
      container.current.removeChild(container.current.firstChild);
    }

    container.current.appendChild(script);
  }, [mainStock]);

  return (
    <div
      className="tradingview-widget-container m-1 mt-0 ml-0"
      ref={container}
      style={{ height: "100%", width: "100%" }}
    ></div>
  );
}

export default memo(TechnicalAnalysis);
