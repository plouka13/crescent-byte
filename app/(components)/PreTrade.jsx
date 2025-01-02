import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const getCurrData = async (stockSymbol) => {
  const response = await fetch(
    `api/pretrade?symbol=${encodeURIComponent(stockSymbol)}`
  );
  console.log(response);
  if (response.ok) {
    const { data } = await response.json();
    const parsedBody = JSON.parse(data.body);
    return parsedBody;
  } else {
    console.error("Error:", response.status);
    return null;
  }
};

export const PreTrade = ({ stockSymbol }) => {
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleButtonClick = async () => {
    setLoading(true);
    const data = await getCurrData(stockSymbol);
    setAnalysisData(data);
    setLoading(false);
  };

  const buttonStates = {
    analyse: "Analyse",
    loading: (
      <>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Analysing...
      </>
    ),
    blocked: "Analyse",
  };

  const getButtonState = () => {
    if (loading) return buttonStates.loading;
    if (analysisData) return buttonStates.blocked;
    return buttonStates.analyse;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Pre-Trade Analysis</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1200px]">
        <DialogHeader>
          <DialogTitle>
            Pre-Trade Analysis (WARNING THIS IS PURELY A RECOMMENDATION)
          </DialogTitle>
          <DialogDescription>
            Analysis for {stockSymbol} stock.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {analysisData ? (
            <DialogDescription>{analysisData.data}</DialogDescription>
          ) : (
            <Skeleton className="h-52 w-full" />
          )}
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleButtonClick}
            disabled={loading || analysisData !== null}
          >
            {getButtonState()}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
