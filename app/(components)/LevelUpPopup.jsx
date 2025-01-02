import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SketchLogoIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const LevelUpPopup = ({ level, unlockedAvatar, unlockedBorder, onClose }) => {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Level Up!</DialogTitle>
          <DialogDescription>
            Congratulations! You have reached level {level}!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-center">
            <SketchLogoIcon className="h-28 w-28 text-yellow-500" />
          </div>
          <p className="text-center">
            Keep up the great work and continue leveling up!
          </p>
          {unlockedAvatar && unlockedBorder && (
            <div className="flex justify-center items-center space-x-4">
              <Avatar className={`${unlockedBorder.style} h-16 w-16`}>
                <AvatarImage src={unlockedAvatar.url} />
                <AvatarFallback>{unlockedAvatar.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg font-semibold">
                  Unlocked: {unlockedAvatar.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {unlockedBorder.name}
                </p>
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button className="w-full" onClick={onClose}>
            Claim Reward
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LevelUpPopup;
