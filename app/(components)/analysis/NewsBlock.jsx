import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

const formatDate = (inputString) => {
  const date = new Date(inputString);
  const options = { month: "short", day: "2-digit" };
  const formattedDate =
    date.toLocaleDateString("en-US", options) + " - " + date.getFullYear();
  return formattedDate;
};

const NewsSection = ({ newsList }) => {
  return (
    <div className="w-80 max-w-none rounded-lg p-3 border border-solid m-3 mr-0">
      <h2 className="text-2xl font-bold pb-1">Latest News</h2>
      <ScrollArea className="h-72">
        {newsList.length === 0 ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="rounded-lg shadow-md">
                <CardHeader>
                  <Skeleton className="h-4 w-1/2 mb-2" />
                  <Skeleton className="h-4 w-1/3" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-4 w-1/4" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          newsList.map((news) => (
            <Card key={news.attribute.link}>
              <div className="rounded-lg shadow-md p-3">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-xs">{news.attribute.publisher}</p>
                  <p className="text-xs text-gray-600">
                    {formatDate(news.attribute.providerPublishTime)}
                  </p>
                </div>
                <h3 className="text-1xl font-bold mb-2">
                  {news.attribute.title}
                </h3>
                <a
                  href={news.attribute.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-500 mt-2 inline-block"
                >
                  Read more
                </a>
              </div>
            </Card>
          ))
        )}
      </ScrollArea>
    </div>
  );
};

export default NewsSection;
