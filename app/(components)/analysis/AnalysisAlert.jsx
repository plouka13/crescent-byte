"use client";
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Cross1Icon } from "@radix-ui/react-icons";

export const AnalysisAlert = ({ title, description, open, onClose }) => {
  return (
    <>
      {open && <Alert >
        <button
          onClick={() => {onClose}}
          className="absolute top-0 right-0 p-2"
        >
          <Cross1Icon className="h-5 w-5" />
        </button>
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>
          {description}
        </AlertDescription>
      </Alert>}
    </>
  )
}

export default AnalysisAlert;