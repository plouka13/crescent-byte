"use client";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DeleteBlock = ({ id, id2 }) => {
  const { data: session, status, update } = useSession();
  const [open, setOpen] = useState(false);

  const deleteTicket = () => {
    let tempStocks = session?.user.stocks;
    tempStocks = tempStocks.filter((item) => item !== id);
    tempStocks = tempStocks.filter((item) => item !== id2);
    update({ stocks: tempStocks });
    setOpen(false);
  };

  return (
    <>
      <FontAwesomeIcon
        icon={faTrash}
        className="pt-1.5 cursor-pointer"
        onClick={() => setOpen(true)}
      />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Stop watching</DialogTitle>
            <DialogDescription>
              Are you sure you want to stop watching this stock?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={deleteTicket}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteBlock;
