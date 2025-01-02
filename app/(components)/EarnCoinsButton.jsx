"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SkeletonCard } from "./SkeletonCard";
import { Loader2 } from "lucide-react";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EarnCoinsButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          Earn Coins{" "}
          <FontAwesomeIcon icon={faCoins} size="sm" className="pl-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Earn Coins</DialogTitle>
          <DialogDescription>
            Watch an ad to earn coins and support the app!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <SkeletonCard />
        </div>
        <DialogFooter>
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EarnCoinsButton;
