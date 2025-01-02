"use client";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectAnalysisStock({ onSelect }) {
  return (
    <Select onValueChange={onSelect}>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="Select a stock" />
      </SelectTrigger>
      <SelectContent>
      <SelectGroup>
          <SelectLabel>NASDAQ</SelectLabel>
          <SelectItem value="AAPL">AAPL</SelectItem>
          <SelectItem value="AMZN">AMZN</SelectItem>
          <SelectItem value="TSLA">TSLA</SelectItem>
          <SelectItem value="COST">COST</SelectItem>
          <SelectItem value="AMC">AMC</SelectItem>
          <SelectItem value="NFLX">NFLX</SelectItem>
          <SelectItem value="NVDA">NVDA</SelectItem>
          <SelectItem value="ORCL">ORCL</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>ASX</SelectLabel>
          <SelectItem value="BHP.AX">BHP.AX</SelectItem>
          <SelectItem value="CBA.AX">CBA.AX</SelectItem>
          <SelectItem value="ANZ.AX">ANZ.AX</SelectItem>
          <SelectItem value="AGL.AX">AGL.AX</SelectItem>
          <SelectItem value="JHX.AX">JHX.AX</SelectItem>
          <SelectItem value="MCY.AX">MCY.AX</SelectItem>
          <SelectItem value="MIN.AX">MIN.AX</SelectItem>
          <SelectItem value="NEM.AX">NEM.AX</SelectItem>
          <SelectItem value="NWL.AX">NWL.AX</SelectItem>
          <SelectItem value="ORI.AX">ORI.AX</SelectItem>
          <SelectItem value="PMV.AX">PMV.AX</SelectItem>
          <SelectItem value="REA.AX">REA.AX</SelectItem>
          <SelectItem value="RIO.AX">RIO.AX</SelectItem>
          <SelectItem value="SGP.AX">SGP.AX</SelectItem>
          <SelectItem value="WOW.AX">WOW.AX</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
