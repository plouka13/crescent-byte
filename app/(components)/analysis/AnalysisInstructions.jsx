import React from "react";
import { CompareDrawer } from "../CompareDrawer";
import { SelectAnalysisStock } from "../SelectAnalysisStock";
import { Button } from "@/components/ui/button";

export const AnalysisInstructions = ({ onSelect, fetchEverything }) => {
  return (
    <div className="p-6">
      <div className="container pt-8">
        <div className="flex flex-row justify-center">
          <h1 className="text-3xl font-bold pr-2">
            Analyse a stocks preformance
          </h1>
          <SelectAnalysisStock onSelect={onSelect} />
          <Button
            variant="outline"
            className="ml-4 px-6 py-2 rounded-md font-bold"
            onClick={fetchEverything}
          >
            GO!
          </Button>
        </div>
        <p className="text-xl text-center mb-2">
          View lastest news, company sentiment, and high level analysis!
        </p>
      </div>
    </div>
  );
};
