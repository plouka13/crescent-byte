"use client";

import React, { useEffect, useState } from 'react';
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const stockSymbols = [
  {
    value: "AAPL",
    label: "AAPL",
  },
  {
    value: "TSLA",
    label: "TSLA",
  },
  {
    value: "AMZN",
    label: "AMZN",
  },
];

export function StockAnalytics({ onSelect }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value ? stockSymbols.find((stockSymbol) => stockSymbol.value === value)?.label : "Select stock symbol..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search stockSymbol..." />
            <CommandEmpty>No stock found.</CommandEmpty>
            <CommandList>
              <CommandGroup>
                {stockSymbols.map((stockSymbol) => (
                  <CommandItem
                    key={stockSymbol.value}
                    value={stockSymbol.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      onSelect(currentValue); // Call the onSelect callback with the selected value
                      setOpen(false); // Close the popover after selecting an option
                    }}
                  >
                    <Check
                      className={value === stockSymbol.value ? "opacity-100" : "opacity-0"}
                    />
                    {stockSymbol.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}

export default StockAnalytics;
