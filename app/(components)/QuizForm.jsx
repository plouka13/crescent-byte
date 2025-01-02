"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Question from "./Question";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSession } from "next-auth/react";

const QuizForm = () => {
  const [question, setQuestion] = useState(1);
  const [answers, setAnswers] = useState([]);
  const [quizdone, setQuizdone] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const quiz = [
    {
      text: "What does the acronym 'IPO' stand for?",
      options: [
        "Initial Public Offering",
        "International Portfolio Optimization",
        "Institutional Private Ownership",
        "Indexed Put Option",
      ],
      answer: "Initial Public Offering",
    },
    {
      text: "Which of the following is not a type of stock market index?",
      options: [
        "Dow Jones Industrial Average",
        "S&P 500",
        "NASDAQ Composite",
        "FTSE 100",
        "Nikkei 225",
        "Russell 3000",
      ],
      answer: "FTSE 100",
    },
    {
      text: "What is the term for a stock that pays regular dividends?",
      options: [
        "Growth stock",
        "Income stock",
        "Blue-chip stock",
        "Penny stock",
      ],
      answer: "Income stock",
    },
    {
      text: "Which of the following is a measure of a stock's volatility?",
      options: [
        "Price-to-earnings ratio",
        "Dividend yield",
        "Beta",
        "Market capitalization",
      ],
      answer: "Beta",
    },
    {
      text: "What is the term for a rapid increase in a stock's price followed by a rapid decrease?",
      options: ["Bull market", "Bear market", "Correction", "Bubble"],
      answer: "Bubble",
    },
    {
      text: "Which of the following is not a sector of the stock market?",
      options: [
        "Technology",
        "Healthcare",
        "Energy",
        "Utilities",
        "Commodities",
      ],
      answer: "Commodities",
    },
    {
      text: "What is the term for a stock split in which the number of shares outstanding is reduced?",
      options: [
        "Forward stock split",
        "Reverse stock split",
        "Bonus issue",
        "Rights issue",
      ],
      answer: "Reverse stock split",
    },
    {
      text: "Which of the following is a type of order to buy or sell a stock at a specific price?",
      options: [
        "Market order",
        "Limit order",
        "Stop order",
        "Trailing stop order",
      ],
      answer: "Limit order",
    },
    {
      text: "What is the term for a company's first sale of stock to the public?",
      options: [
        "Secondary offering",
        "Seasoned equity offering",
        "Direct listing",
        "Initial public offering",
      ],
      answer: "Initial public offering",
    },
    {
      text: "Which of the following is a measure of a company's profitability?",
      options: [
        "Earnings per share",
        "Price-to-earnings ratio",
        "Dividend yield",
        "Market capitalization",
      ],
      answer: "Earnings per share",
    },
    {
      text: "What is the term for a stock that is considered to be a safer investment due to its consistent performance?",
      options: [
        "Growth stock",
        "Income stock",
        "Blue-chip stock",
        "Penny stock",
      ],
      answer: "Blue-chip stock",
    },
    {
      text: "Which of the following is not a major U.S. stock exchange?",
      options: [
        "New York Stock Exchange",
        "NASDAQ",
        "London Stock Exchange",
        "American Stock Exchange",
      ],
      answer: "London Stock Exchange",
    },
    {
      text: "What is the term for a stock that is trading at a higher price than its intrinsic value?",
      options: ["Undervalued", "Overvalued", "Fairly valued", "Growth stock"],
      answer: "Overvalued",
    },
    {
      text: "Which of the following is a type of stock that gives the holder ownership in a company?",
      options: ["Common stock", "Preferred stock", "Bonds", "Mutual funds"],
      answer: "Common stock",
    },
    {
      text: "What is the term for a period of time in which a stock's price is rising?",
      options: ["Bull market", "Bear market", "Correction", "Recession"],
      answer: "Bull market",
    },
    {
      text: "Which of the following is a type of analysis that looks at a company's financial statements?",
      options: [
        "Technical analysis",
        "Fundamental analysis",
        "Sentiment analysis",
        "Quantitative analysis",
      ],
      answer: "Fundamental analysis",
    },
    {
      text: "What is the term for a stock that has a low price and high risk?",
      options: [
        "Growth stock",
        "Income stock",
        "Blue-chip stock",
        "Penny stock",
      ],
      answer: "Penny stock",
    },
    {
      text: "Which of the following is a measure of how much a company is worth?",
      options: [
        "Earnings per share",
        "Price-to-earnings ratio",
        "Dividend yield",
        "Market capitalization",
      ],
      answer: "Market capitalization",
    },
    {
      text: "What is the term for a stock that has the potential for significant growth?",
      options: [
        "Growth stock",
        "Income stock",
        "Blue-chip stock",
        "Penny stock",
      ],
      answer: "Growth stock",
    },
    {
      text: "Which of the following is a type of order to sell a stock when it reaches a certain price?",
      options: [
        "Market order",
        "Limit order",
        "Stop order",
        "Trailing stop order",
      ],
      answer: "Stop order",
    },
  ];
  const { data: session, status, update } = useSession();

  const [dialogOpen, setDialogOpen] = useState(false);

  const saveAnswer = (e, q) => {
    let newAnswers = answers;
    newAnswers.push({ question: q, answer: e });
    setAnswers(newAnswers);
    if (e) {
      setScore(score + 1);
    }
    if (question < selectedQuestions.length) {
      setQuestion(question + 1);
    }
    if (question === selectedQuestions.length) {
      setQuizdone(true);
      setDialogOpen(true);
      const experience = score * 5; // Calculate the experience points earned

      // Update the user's experience
      let tempExperience = session?.user?.experience || 0;
      tempExperience += experience;
      update({ experience: tempExperience });
    }
  };

  const resetQuiz = () => {
    setQuestion(1);
    setAnswers([]);
    setQuizdone(false);
    setScore(0);
    setSelectedQuestions(getRandomQuestions(4));
  };

  const getRandomQuestions = (count) => {
    const shuffled = [...quiz].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  React.useEffect(() => {
    setSelectedQuestions(getRandomQuestions(4));
  }, []);

  return (
    <Card>
      <CardHeader>
        {!quizdone && (
          <div>
            <Progress
              className="h-[2px] mb-5 opacity-50"
              value={(question * 100) / selectedQuestions.length || 0}
            />
            <CardTitle className="text-sm">
              Question {question}/{selectedQuestions.length || 0}
            </CardTitle>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="">
          {!quizdone &&
            selectedQuestions.map((x, i) => {
              if (i + 1 === question) {
                return (
                  <Question
                    key={i}
                    data={x}
                    save={(e) => saveAnswer(e, i + 1)}
                  ></Question>
                );
              }
              return null;
            })}
          {quizdone && (
            <div className="flex flex-col items-center">
              <Label className="text-3xl">Quiz Results:</Label>
              <Separator className="my-2" />
              <span className="text-2xl">
                You got {score}/{selectedQuestions.length} questions correct!
              </span>
              <Button className="mt-5" onClick={resetQuiz}>
                Try again?
              </Button>

              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Rewards!</DialogTitle>
                    <DialogDescription>
                      Congratulations! You earned {score * 5} experience points.
                      <br></br>Keep trying your best!
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizForm;
