import React from "react";
import HeaderBar from "./HeaderBar";
import QuizForm from "./QuizForm";

export const QuizLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <HeaderBar pageName="Quiz" />
      <div className="container mx-auto py-12 pb-6">
        <h1 className="text-4xl font-bold mb-8 text-center">Quiz time!</h1>
        <p className="text-xl text-center">
          Earn experience points and become a better trader.
        </p>
      </div>
      <div className="flex justify-center items-center flex-grow">
        <div className="p-4 pt-0 w-full md:w-1/2">
          <QuizForm />
        </div>
      </div>
    </div>
  );
};
