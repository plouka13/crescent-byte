import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function NewUserTips() {
  const tips = [
    "Welcome to our stock trading platform! Explore the various features and tools available to enhance your trading experience.",
    "Create a personalized watchlist to keep track of your favorite stocks and monitor their performance.",
    "Use our advanced charting tools to analyze stock trends, patterns, and technical indicators.",
    "Stay informed with real-time market news and insights to make timely and informed trading decisions.",
    "Customize your dashboard to display the information and metrics that matter most to you.",
  ];

  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {tips.map((tip, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <div>
                    <p className="text-lg">{tip}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
