import React from "react";
import { CompareDrawer } from "./CompareDrawer";

export const CompareInstructions = ({ stock1, stock2 }) => {
  return (
    <div className="p-6">
      <div className="container pt-8">
        <div className="flex flex-row justify-center">
          <h1 className="text-3xl font-bold pr-2">Compare stock preformance</h1>
          <CompareDrawer stock1={stock1} stock2={stock2} className="outline" />
        </div>
        <p className="text-xl text-center mb-2">
          Just select two stocks and watch the magic happen!
        </p>
      </div>
    </div>
  );
};
