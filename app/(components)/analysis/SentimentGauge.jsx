// SentimentGauge.js

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const GaugeComponent = dynamic(() => import("react-gauge-component"), {
  ssr: false,
});

const SentimentGauge = ({ sentiment }) => {
  const [currSentiment, setCurrSentiment] = useState(0);
  useEffect(() => {
    if (sentiment && sentiment <= 1 && sentiment >= -1) {
      setCurrSentiment(sentiment);
    } else {
      setCurrSentiment(0);
    }
  }, [sentiment]);

  const getSentimentMessage = (givenSentiment) => {
    if (givenSentiment) {
      return `
        Currently, the analyzed sentiment is ${parseFloat(
          givenSentiment.toFixed(2)
        )}.
      `;
    } else {
      return `Loading ...`;
    }
  };

  const getSentimentDescription = (givenSentiment) => {
    if (!givenSentiment) {
      return `Loading ...`;
    }
    if (givenSentiment < -0.5) {
      return `
        This indicates that there is a strong negative perception towards the company
        being evaluated, with significant expressions of criticism or dissatisfaction.
      `;
    } else if (givenSentiment < -0.1) {
      return `
        This indicates that there is a negative perception towards the company
        being evaluated, with a prevalence of negative viewpoints over positive ones.
      `;
    } else if (givenSentiment < 0) {
      return `
        This indicates a prevalence of negative viewpoints over positive or neutral ones.
        Nevertheless, it's crucial to highlight that the polarity score's magnitude is relatively modest.
      `;
    } else if (givenSentiment === 0) {
      return `
        This indicates a neutral sentiment. This means that there is an absence of strong positive
        or negative feelings or opinions towards the subject being evaluated.
      `;
    } else if (givenSentiment < 0.1) {
      return `
        This indicates a prevalence of positive or neutral viewpoints over negative ones. Nevertheless, it's 
        crucial to highlight that the polarity score's magnitude is relatively modest.
      `;
    } else if (givenSentiment < 0.5) {
      return `
        This indicates that there is a favourable perception towards the company
        being evaluated, with a prevalence of positive or neutral viewpoints over negative ones.
      `;
    } else {
      return `
        This indicates that there is a strong favorable perception towards the company
        being evaluated, with significant expressions of positivity or approval.
      `;
    }
  };
  return (
    <div className="w-80 max-w-none rounded-lg p-3 border border-solid m-3 mr-0">
      <div className="flex items-center">
        <h2 className="text-2xl font-bold pr-1 pt-1 pl-1">Sentiment</h2>
        <Dialog>
          <DialogTrigger asChild>
            <div className="hover:cursor-pointer">
              <QuestionMarkCircledIcon className="h-5 w-5" />
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Sentiment Analyzer</DialogTitle>
              <DialogDescription>
                We employ a sentiment analysis tool to assess the public
                perception of your selected company based on recent news
                articles.
              </DialogDescription>
              <DialogDescription>
                The sentiment score ranges from -1 to 1, where -1 indicates an
                extremely negative sentiment towards the company, while 1
                signifies a highly positive sentiment.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <GaugeComponent
        arc={{
          subArcs: [
            { limit: -0.5, color: "#EA4228", showTick: true },
            { limit: 0, color: "#F58B19", showTick: true },
            { limit: 0.5, color: "#F5CD19", showTick: true },
            { limit: 1, color: "#5BE12C", showTick: true },
          ],
        }}
        value={currSentiment}
        maxValue={1}
        minValue={-1}
      />
      <Card className="m-0 p-0 mt-4">
        <CardHeader>
          <CardTitle className="text-lg">Current Sentiment</CardTitle>
          <CardDescription>
            {getSentimentMessage(currSentiment)}
          </CardDescription>
          <CardTitle className="text-lg">Sentiment Description</CardTitle>
          <CardDescription>
            {getSentimentDescription(currSentiment)}
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};

export default SentimentGauge;
