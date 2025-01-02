"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FilePlus, FileMinus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { PreTrade } from "./PreTrade";

const getMarketStatus = async (market) => {
  let response;
  if (market === "NMS") {
    response = await fetch(`api/status`);
  } else if (market === "ASX") {
    response = await fetch(`api/asxstatus`);
  } else {
    return "Market Not Supported";
  }

  if (response.ok) {
    const { data } = await response.json();
    if (market === "NMS") {
      return data.markets[0].current_status === "closed"; // true if closed
    } else if (market === "ASX") {
      // const parsedBody = JSON.parse(data.body);
      return false;
    }
  } else {
    console.error("Error:", response.status);
  }
};

export function TradePopup({ mainStock }) {
  const [selectedOption, setSelectedOption] = useState("Buy");
  const [currStock, setCurrStock] = useState(null);
  const [marketStatus, setMarketStatus] = useState(null);
  const [quantity, setQuantity] = useState("");
  const { data: session, status, update } = useSession();
  const [open, setOpen] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleConfirm = () => {
    const parsedQuantity = parseInt(quantity);
    if (parsedQuantity > 0) {
      const tradeAmount =
        parsedQuantity *
        (selectedOption === "Buy" ? mainStock.ask : mainStock.bid);
      const currentBalance = session?.user.balance || 0;

      if (selectedOption === "Buy") {
        if (tradeAmount > currentBalance) {
          setShowErrorDialog(true);
        } else {
          const tradeDetails = {
            stock: mainStock.symbol,
            amount: parsedQuantity,
            buy_date: new Date(),
            sell_date: null,
            stock_value: mainStock.ask,
            currency: "USD",
          };

          let tempInvestments = session?.user.curr_inv || [];
          tempInvestments.push(tradeDetails);

          let tempHoldings = session?.user.curr_holdings || [];
          const existingHolding = tempHoldings.find(
            (holding) => holding.stock === mainStock.symbol
          );
          if (existingHolding) {
            existingHolding.amount += parsedQuantity;
          } else {
            tempHoldings.push({
              stock: mainStock.symbol,
              amount: parsedQuantity,
            });
          }

          const newBalance = currentBalance - tradeAmount;
          let tempExperience = session?.user?.experience || 0;
          tempExperience += 25;
          update({
            curr_inv: tempInvestments,
            curr_holdings: tempHoldings,
            balance: newBalance,
            experience: tempExperience,
          });
          setQuantity("");
          setOpen(false);
        }
      } else if (selectedOption === "Sell") {
        const userHoldings = session?.user.curr_holdings || [];
        const holdingToSell = userHoldings.find(
          (holding) => holding.stock === mainStock.symbol
        );

        if (!holdingToSell || holdingToSell.amount < parsedQuantity) {
          setShowErrorDialog(true);
        } else {
          const tradeDetails = {
            stock: mainStock.symbol,
            amount: parsedQuantity,
            buy_date: null,
            sell_date: new Date(),
            stock_value: mainStock.bid,
            currency: "USD",
          };

          let tempInvestments = session?.user.prev_inv || [];
          tempInvestments.push(tradeDetails);

          let tempHoldings = session?.user.curr_holdings || [];
          const updatedHoldings = tempHoldings.map((holding) => {
            if (holding.stock === mainStock.symbol) {
              holding.amount -= parsedQuantity;
            }
            return holding;
          });

          const newBalance = currentBalance + tradeAmount;
          let tempExperience = session?.user?.experience || 0;
          tempExperience += 25;
          update({
            prev_inv: tempInvestments,
            curr_holdings: updatedHoldings,
            balance: newBalance,
            experience: tempExperience,
          });
          setQuantity("");
          setOpen(false);
        }
      }
    }
  };

  useEffect(() => {
    const fetchMarketStatus = async () => {
      if (mainStock) {
        const data = await getMarketStatus(mainStock.exchange);
        setMarketStatus(data);
        setCurrStock(mainStock.symbol);
      }
    };

    fetchMarketStatus();
  }, [mainStock]);

  const isMarketClosed =
    typeof marketStatus === "string"
      ? marketStatus === "Market Not Supported"
      : marketStatus;

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex flex-row items-center justify-between">
              <div>Make Trade</div>
              <PreTrade stockSymbol={currStock} />
            </div>
          </CardTitle>
          <CardDescription>
            Based on real-time data, simulate a new trade.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <RadioGroup
            defaultValue="Buy"
            className="grid grid-cols-2 gap-4"
            onValueChange={setSelectedOption}
          >
            <div>
              <RadioGroupItem value="Buy" id="Buy" className="peer sr-only" />
              <Label
                htmlFor="Buy"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <FilePlus className="mb-3 h-6 w-6" />
                Buy
              </Label>
            </div>
            <div>
              <RadioGroupItem value="Sell" id="Sell" className="peer sr-only" />
              <Label
                htmlFor="Sell"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <FileMinus className="mb-3 h-6 w-6" />
                Sell
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
        <CardFooter>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                variant="secondary"
                className="w-full"
                disabled={!mainStock || isMarketClosed}
              >
                {mainStock ? (
                  isMarketClosed ? (
                    typeof marketStatus === "string" ? (
                      marketStatus
                    ) : (
                      "Market Closed"
                    )
                  ) : (
                    "Continue"
                  )
                ) : (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                )}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Confirm Trade</DialogTitle>
                <DialogDescription>
                  Please confirm your trade details.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4 py-4">
                <div className="grid grid-cols-2 gap-4  pt-1">
                  <div>Stock:</div>
                  <div className="pl-2">{mainStock?.symbol}</div>
                </div>
                <div className="grid grid-cols-2 gap-4  pt-1">
                  <div>Action:</div>
                  <div className="pl-2">{selectedOption}</div>
                </div>
                <div className="grid grid-cols-2 gap-4  pt-1">
                  <div>
                    {selectedOption === "Buy" ? "Bid Price:" : "Ask Price:"}
                  </div>
                  <div className="pl-2">
                    {selectedOption === "Buy" ? mainStock?.bid : mainStock?.ask}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div>
                    {selectedOption === "Buy" ? "Bid Size:" : "Ask Size:"}
                  </div>
                  <div className="pl-2">
                    {selectedOption === "Buy"
                      ? mainStock?.bidSize
                      : mainStock?.askSize}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4  pt-1">
                  <div className="pt-1">Quantity:</div>
                  <Input
                    className=""
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min={1}
                    max={
                      selectedOption === "Buy"
                        ? mainStock?.bidSize
                        : mainStock?.askSize
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button variant="default" onClick={handleConfirm}>
                  Confirm
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
      <Dialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <DialogTrigger />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insufficient Balance/Holding</DialogTitle>
            <DialogDescription>
              You do not have enough funds/stocks to complete this order.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowErrorDialog(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
