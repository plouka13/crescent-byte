"use client";
import React from "react";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// for latest data
const PinBlock = ({ id }) => {
  const [open, setOpen] = React.useState(false);
  const [response, setResponse] = React.useState(null);

  const investTicket = async () => {
    try {
      const response = await fetch(
        `https://jdktzejo4f.execute-api.ap-southeast-2.amazonaws.com/prod/latest?symbol=${encodeURIComponent(
          id
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("HI");
      const data = await response.json();
      setResponse(JSON.stringify(data, null, 2));
      setOpen(true);
    } catch (error) {
      console.error("Error invoking API route:", error);
    }
  };

  return (
    <>
      <div onClick={investTicket}>
        <FontAwesomeIcon icon={faCircleInfo} className="pt-1.5" />
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger />
        <DialogContent>
          <DialogTitle>API Response</DialogTitle>
          <pre>{response}</pre>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PinBlock;
