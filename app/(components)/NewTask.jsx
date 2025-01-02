"use client";
import React from "react";
import { faNotesMedical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function NewTask() {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "https://jdktzejo4f.execute-api.ap-southeast-2.amazonaws.com/prod/upload",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ body: { symbol: inputValue } }),
        }
      );
      const data = await response.json();
      let toPrint = JSON.stringify(data, null, 2);
      setApiResponse(toPrint);
    } catch (error) {
      console.error("Error invoking API route:", error);
      throw error;
    }
  };

  return (
    <>
      <div onClick={() => setOpen(true)}>
        <FontAwesomeIcon
          icon={faNotesMedical}
          size="2x"
          className="text-white hover:cursor-pointer hover:text-red-200"
        />
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Get data for:</DialogTitle>
            <DialogDescription>
              Enter the symbol to retrieve data.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter symbol"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {apiResponse && (
        <Dialog open={true} onOpenChange={() => setApiResponse(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>API Response</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <pre>{apiResponse}</pre>
            </div>
            <DialogFooter>
              <Button onClick={() => setApiResponse(null)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default NewTask;
