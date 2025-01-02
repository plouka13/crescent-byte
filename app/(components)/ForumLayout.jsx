import React from "react";
import HeaderBar from "./HeaderBar";
import { ForumMain } from "./ForumMain";

export const ForumLayout = () => {
  return (
    <div>
      <HeaderBar pageName="Forums" />
      <ForumMain />
    </div>
  );
};
