"use client";
import React, { useEffect, useRef, memo } from "react";

function MiniGraph({ mainStock }) {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    console.log(mainStock);
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
    {
      "symbol": "FX:EURUSD",
      "width": 175,
      "height": 110,
      "locale": "en",
      "dateRange": "1D",
      "colorTheme": "dark",
      "isTransparent": false,
      "autosize": false,
      "largeChartUrl": "",
      "chartOnly": true
    }`;
    while (container.current.firstChild) {
      container.current.removeChild(container.current.firstChild);
    }

    container.current.appendChild(script);
  }, [mainStock]);

  return (
    <div className="tradingview-widget-container pt-0" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
}

export default memo(MiniGraph);
