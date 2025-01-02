import React from "react";
import HeaderBar from "./HeaderBar";
import { CompareBoard } from "./CompareBoard";

export const CompareMain = () => {
  return (
    <div>
      <HeaderBar pageName="Compare" />
      <CompareBoard />
    </div>
  );
};
