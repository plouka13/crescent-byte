"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import HeaderBar from "./HeaderBar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const avatars = [
  {
    id: 1,
    name: "The Farmer",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE14EsW1uTtabJtchrCcnr7kEBTdPyDqUSoA&s",
    requiredLevel: 1,
  },
  {
    id: 2,
    name: "The Boss",
    url: "https://avatars.githubusercontent.com/u/124599?v=4",
    requiredLevel: 2,
  },
  {
    id: 3,
    name: "The Astronaut",
    url: "https://avatarfiles.alphacoders.com/371/371359.png",
    requiredLevel: 3,
  },
  {
    id: 4,
    name: "The Trader",
    url: "https://avatarfiles.alphacoders.com/372/372948.png",
    requiredLevel: 4,
  },
  {
    id: 5,
    name: "Flowers",
    url: "https://avatarfiles.alphacoders.com/369/369952.png",
    requiredLevel: 5,
  },
  {
    id: 6,
    name: "Telescope",
    url: "https://avatarfiles.alphacoders.com/371/371441.png",
    requiredLevel: 6,
  },
  {
    id: 7,
    name: "Whale",
    url: "https://avatarfiles.alphacoders.com/370/370241.png",
    requiredLevel: 7,
  },
  {
    id: 8,
    name: "Cave",
    url: "https://avatarfiles.alphacoders.com/370/370205.png",
    requiredLevel: 8,
  },
  {
    id: 9,
    name: "Coffee",
    url: "https://avatarfiles.alphacoders.com/370/370240.png",
    requiredLevel: 9,
  },
  {
    id: 10,
    name: "Cake",
    url: "https://avatarfiles.alphacoders.com/370/370775.png",
    requiredLevel: 10,
  },
  {
    id: 11,
    name: "Ring",
    url: "https://avatarfiles.alphacoders.com/374/374052.png",
    requiredLevel: 11,
  },
];

const borders = [
  { id: 1, name: "No Border", style: "", requiredLevel: 1 },
  {
    id: 2,
    name: "Red Border",
    style: "outline outline-1 outline-red-700",
    requiredLevel: 2,
  },
  {
    id: 3,
    name: "Blue Border",
    style: "outline outline-1 outline-blue-700",
    requiredLevel: 3,
  },
  {
    id: 4,
    name: "Green Border",
    style: "outline outline-1 outline-green-700",
    requiredLevel: 4,
  },
  {
    id: 5,
    name: "Yellow Border",
    style: "outline outline-1 outline-yellow-700",
    requiredLevel: 5,
  },
  {
    id: 6,
    name: "Purple Border",
    style: "outline outline-1 outline-purple-700",
    requiredLevel: 6,
  },
  {
    id: 7,
    name: "Pink Border",
    style: "outline outline-1 outline-pink-700",
    requiredLevel: 7,
  },
  {
    id: 8,
    name: "Orange Border",
    style: "outline outline-1 outline-orange-700",
    requiredLevel: 8,
  },
  {
    id: 9,
    name: "Teal Border",
    style: "outline outline-1 outline-teal-700",
    requiredLevel: 9,
  },
  {
    id: 10,
    name: "Indigo Border",
    style: "outline outline-1 outline-indigo-700",
    requiredLevel: 10,
  },
  {
    id: 11,
    name: "Gray Border",
    style: "outline outline-1 outline-gray-700",
    requiredLevel: 11,
  },
];
// use real data or just this for "DEMO"
const leaderboardData = [
  {
    rank: 1,
    name: "Bobby Lee",
    prize: "$500",
    profit: "$1,200",
    level: 5,
    avatar: avatars[4],
    border: borders[4],
  },
  {
    rank: 2,
    name: "Bobby Li",
    prize: "$250",
    profit: "$999",
    level: 3,
    avatar: avatars[2],
    border: borders[2],
  },
  {
    rank: 3,
    name: "Bobby Ly",
    prize: "$125",
    profit: "$925",
    level: 1,
    avatar: avatars[0],
    border: borders[0],
  },
  {
    rank: 4,
    name: "Bobby Ly",
    prize: "$50",
    profit: "$343",
    level: 1,
    avatar: avatars[3],
    border: borders[3],
  },
  {
    rank: 5,
    name: "Bobby Ly",
    prize: "$45",
    profit: "$232",
    level: 1,
    avatar: avatars[1],
    border: borders[1],
  },
  {
    rank: 6,
    name: "Bobby Ly",
    prize: "$40",
    profit: "$220",
    level: 1,
    avatar: avatars[5],
    border: borders[5],
  },
  {
    rank: 7,
    name: "Bobby Ly",
    prize: "$30",
    profit: "$54",
    level: 1,
    avatar: avatars[6],
    border: borders[6],
  },
  {
    rank: 8,
    name: "Bobby Ly",
    prize: "$25",
    profit: "$20",
    level: 1,
    avatar: avatars[7],
    border: borders[7],
  },
  {
    rank: 9,
    name: "Bobby Ly",
    prize: "$20",
    profit: "$19",
    level: 1,
    avatar: avatars[8],
    border: borders[8],
  },
  {
    rank: 10,
    name: "Bobby Ly",
    prize: "$10",
    profit: "$0",
    level: 1,
    avatar: avatars[9],
    border: borders[9],
  },
];

export const Leaderboard = () => {
  return (
    <div>
      <HeaderBar pageName="Leaderboard" />
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Monthly leaderboard
        </h1>
        <p className="text-xl text-center mb-12">
          Do you find yourself lacking motivation sometimes? Heres a little
          something to help you push for the moon.
          <br />
          Every month the top three users will win cash prizes based on their
          monthly profits!
        </p>
        <div className="flex justify-center mb-8">
          <p className="px-4 py-2 rounded-md">Start trading now!</p>
          <Link href="/dashboard">
            <Button
              variant="outline"
              className="ml-4 px-6 py-2 rounded-md font-bold"
            >
              GO!
            </Button>
          </Link>
        </div>
        <Table>
          <TableCaption>Monthly leaderboard</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Rank</TableHead>
              <TableHead>Icon</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Profit</TableHead>
              <TableHead>Prize</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboardData.map((data, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium pl-7">{data.rank}</TableCell>
                <TableCell className="pl-2">
                  <Avatar className={`${data.border.style} w-12 h-12`}>
                    <AvatarImage src={data.avatar.url} alt={data.avatar.name} />
                    <AvatarFallback>
                      {data.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell className="pl-7">{data.level}</TableCell>
                <TableCell>{data.profit}</TableCell>
                <TableCell>{data.prize}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
