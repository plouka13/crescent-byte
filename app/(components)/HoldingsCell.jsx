"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const HoldingsCell = ({ stockSymbol }) => {
  const { data: session } = useSession();
  const [holdings, setHoldings] = useState(null);

  useEffect(() => {
    const tempHoldings = session?.user.curr_holdings || [];
    const stockHolding = tempHoldings.find(
      (holding) => holding.stock === stockSymbol
    );
    setHoldings(stockHolding ? stockHolding.amount : "N/A");
  }, [session, stockSymbol]);

  return <div>{holdings}</div>;
};

export default HoldingsCell;
