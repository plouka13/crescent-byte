"use client";
import React, { useState, useEffect } from "react";
import { useChat } from "ai/react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ChatBubbleIcon, Cross1Icon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";

const avatars = [
  {
    id: 0,
    name: "The Farmer",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE14EsW1uTtabJtchrCcnr7kEBTdPyDqUSoA&s",
    requiredLevel: 0,
  },
  {
    id: 1,
    name: "Ring",
    url: "https://avatarfiles.alphacoders.com/374/374052.png",
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
    id: 50,
    name: "Chatbot",
    url: "https://avatarfiles.alphacoders.com/371/thumb-350-371479.webp",
    requiredLevel: 50,
  },
];

const borders = [
  { id: 0, name: "No Border", style: "", requiredLevel: 0 },
  {
    id: 1,
    name: "Gray Border",
    style: "outline outline-1 outline-gray-700",
    requiredLevel: 1,
  },
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
];

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { data: session, status, update } = useSession();
  const [selectedAvatar, setSelectedAvatar] = useState(
    avatars.find((avatar) => avatar.id === session?.user?.avatar) || avatars[0]
  );
  const [selectedBorder, setSelectedBorder] = useState(
    borders.find((border) => border.id === session?.user?.border) || borders[0]
  );

  useEffect(() => {
    setSelectedAvatar(
      avatars.find((avatar) => avatar.id === session?.user?.avatar) ||
        avatars[0]
    );
    setSelectedBorder(
      borders.find((border) => border.id === session?.user?.border) ||
        borders[0]
    );
  }, [selectedAvatar, selectedBorder, session]);

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsChatOpen(true)}
        className=""
      >
        <ChatBubbleIcon className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Open Chat</span>
      </Button>

      {isChatOpen && (
        <Card className="fixed bottom-8 right-8 w-96">
          <CardHeader className="bg-muted/50">
            <div className="flex flex-row items-center">
              <CardTitle>Chatbot</CardTitle>
              <Button
                variant="ghost"
                className="ml-auto pt-0"
                onClick={() => setIsChatOpen(false)}
              >
                <div className="pt-2">
                  <Cross1Icon />
                </div>
              </Button>
            </div>
          </CardHeader>
          <ScrollArea className="h-96">
            <CardContent className="p-4">
              {messages.map((m) => (
                <div key={m.id} className="flex items-start mb-4">
                  <Avatar className={`${selectedBorder.style} mr-2`}>
                    <AvatarImage
                      src={
                        m.role === "user"
                          ? selectedAvatar.url
                          : avatars.find((avatar) => avatar.id === 50).url
                      }
                      alt={m.role === "user" ? "User Avatar" : "Chatbot Avatar"}
                    />
                    <AvatarFallback>
                      {m.role === "user" ? "U" : "C"}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`p-2 rounded ${
                      m.role === "user" ? "bg-blue-500 " : "bg-gray-500 "
                    }`}
                  >
                    <p>{m.content}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </ScrollArea>
          <CardFooter className="bg-muted/50">
            <form
              onSubmit={handleSubmit}
              className="flex items-center space-x-2 p-4 pb-0 pl-8"
            >
              <Input
                type="text"
                className="flex-grow"
                value={input}
                placeholder="Type your message..."
                onChange={handleInputChange}
              />
              <Button type="submit" className="bg-blue-500 rounded">
                Send
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
