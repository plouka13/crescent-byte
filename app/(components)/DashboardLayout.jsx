"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { StockStats } from "../(components)/StockStats";
import StockTable from "../(components)/StockTable";
import StockTicker from "../(components)/StockTicker";
import { TradePopup } from "./TradePopup";
import HeaderBar from "./HeaderBar";
import AchievementPopup from "./AchievementPopup";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { NewUserTips } from "./NewUserTips";

export const DashboardLayout = () => {
  const [selectedStock, setSelectedStock] = useState();
  const { data: session, update } = useSession();
  const [showFirstLoginPopup, setShowFirstLoginPopup] = useState(false);

  useEffect(() => {
    if (session?.user.first_login) {
      setShowFirstLoginPopup(true);
    }
  }, [session]);

  const handleCloseFirstLoginPopup = async () => {
    setShowFirstLoginPopup(false);
    await update({ first_login: false });
  };

  return (
    <div className="flex flex-col h-screen">
      <AchievementPopup />
      <HeaderBar pageName="Dashboard" />
      <div className="flex flex-row p-2 pb-0 h-6/6 justify-center">
        <div className="flex flex-col gap-2">
          <StockTable mainStock={setSelectedStock} />
          <TradePopup mainStock={selectedStock} />
        </div>
        <div className="w-6/12 pl-3">
          <StockTicker mainStock={selectedStock?.symbolLong || "NASDAQ:AAPL"} />
        </div>
        <div className="w-3/12 pl-3">
          <StockStats mainStock={selectedStock} />
        </div>
      </div>
      <Dialog
        open={showFirstLoginPopup}
        onOpenChange={handleCloseFirstLoginPopup}
      >
        <DialogContent className="sm:max-w-[650px]">
          <DialogHeader>
            <DialogTitle>Welcome!</DialogTitle>
            <DialogDescription>
              Here are some tips for new users!
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center justify-center">
              <NewUserTips />
            </div>
            <p className="text-center">
              Get started now! There are so many rewards to win!
            </p>
          </div>
          <DialogFooter>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={handleCloseFirstLoginPopup}
            >
              Get Started
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
