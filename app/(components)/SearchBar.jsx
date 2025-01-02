"use client";
import React from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const { data: session, status, update } = useSession();
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertDescription, setAlertDescription] = useState("");

  const handleSubmit = async () => {
    const response = await fetch(
      `api/info?symbol=${encodeURIComponent(inputValue)}`
    );
    if (response.ok) {
      const { data } = await response.json();
      const bodyValue = JSON.parse(data.body);
      const stockInfo = {
        symbol: bodyValue.symbol,
        exchange: bodyValue.exchange,
      };

      if (stockInfo.exchange === "NMS") {
        let tempStocks = session?.user.stocks;
        let tempStockSymbol = `NASDAQ:${stockInfo.symbol}`;
        if (!tempStocks.includes(tempStockSymbol)) {
          tempStocks.push(tempStockSymbol);
          update({ stocks: tempStocks });
          setAlertTitle("Success");
          setAlertDescription(
            `${stockInfo.symbol} has been added to your watchlist.`
          );
        } else {
          setAlertTitle("Already Watched");
          setAlertDescription(
            `${stockInfo.symbol} is already in your watchlist.`
          );
        }
      } else if (stockInfo.exchange === "ASX") {
        let tempStocks = session?.user.stocks;
        let tempStockSymbol = `ASX:${stockInfo.symbol.split(".")[0]}`;
        if (!tempStocks.includes(tempStockSymbol)) {
          tempStocks.push(tempStockSymbol);
          update({ stocks: tempStocks });
          setAlertTitle("Success");
          setAlertDescription(
            `${stockInfo.symbol} has been added to your watchlist.`
          );
        } else {
          setAlertTitle("Already Watched");
          setAlertDescription(
            `${stockInfo.symbol} is already in your watchlist.`
          );
        }
      } else if (stockInfo.exchange === "CCC") {
        let tempStocks = session?.user.stocks;
        let tempStockSymbol = stockInfo.symbol;
        if (!tempStocks.includes(tempStockSymbol)) {
          tempStocks.push(tempStockSymbol);
          update({ stocks: tempStocks });
          setAlertTitle("Success");
          setAlertDescription(
            `${stockInfo.symbol} has been added to your watchlist.`
          );
        } else {
          setAlertTitle("Already Watched");
          setAlertDescription(
            `${stockInfo.symbol} is already in your watchlist.`
          );
        }
      } else if (stockInfo.exchange === "CCY") {
        let tempStocks = session?.user.stocks;
        let tempStockSymbol = stockInfo.symbol;
        if (!tempStocks.includes(tempStockSymbol)) {
          tempStocks.push(tempStockSymbol);
          update({ stocks: tempStocks });
          setAlertTitle("Success");
          setAlertDescription(
            `${stockInfo.symbol} has been added to your watchlist.`
          );
        } else {
          setAlertTitle("Already Watched");
          setAlertDescription(
            `${stockInfo.symbol} is already in your watchlist.`
          );
        }
      } else {
        setAlertTitle("Invalid Stock");
        setAlertDescription(`Not a Nasdaq or ASX stock.`);
      }
    } else {
      setAlertTitle("Error");
      setAlertDescription(
        `An error occurred while fetching stock information. Status: ${response.status}`
      );
    }
    setOpen(false);
    setAlertOpen(true);
  };

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="hover:cursor-pointer ml-auto"
      >
        <PlusIcon width={28} height={28} />
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Start tracking</DialogTitle>
            <DialogDescription>
              Enter the symbol of the stock you want to track.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter stock symbol"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Track</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
            <AlertDialogDescription>{alertDescription}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setAlertOpen(false)}>
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default SearchBar;
