"use client";
import React, { useEffect, useRef, memo } from "react";

function NewsCard({ mainStock }) {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "feedMode": "all_symbols",
        "isTransparent": false,
        "displayMode": "regular",
        "width": 400,
        "height": 550,
        "colorTheme": "dark",
        "locale": "en"
      }
    `;

    const widgetContainer = document.createElement("div");
    widgetContainer.className = "tradingview-widget-container";
    widgetContainer.appendChild(script);

    while (container.current.firstChild) {
      container.current.removeChild(container.current.firstChild);
    }
    container.current.appendChild(widgetContainer);
  }, [mainStock]);

  return (
    <div
      className="tradingview-widget-container m-1 mt-0 ml-0"
      ref={container}
      style={{ height: "100%", width: "100%" }}
    ></div>
  );
}

export default memo(NewsCard);
