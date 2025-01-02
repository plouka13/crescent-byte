"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
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
import { Progress } from "@/components/ui/progress";
import LevelUpPopup from "./LevelUpPopup";

const calculateLevel = (exp) => {
  let level = 0;
  let requiredExp = 100;

  while (exp >= requiredExp) {
    exp -= requiredExp;
    level++;
    requiredExp = Math.floor(requiredExp * 1.5);
  }

  return { level, exp, requiredExp };
};

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

const NameTag = () => {
  const { data: session, status, update } = useSession();
  const [name, setName] = useState(session?.user?.name || "Loading");
  const [email, setEmail] = useState(session?.user?.email || "Loading");
  const [selectedAvatar, setSelectedAvatar] = useState(
    avatars.find((avatar) => avatar.id === session?.user?.avatar) || avatars[0]
  );
  const [selectedBorder, setSelectedBorder] = useState(
    borders.find((border) => border.id === session?.user?.border) || borders[0]
  );
  const [previewAvatar, setPreviewAvatar] = useState(selectedAvatar);
  const [previewBorder, setPreviewBorder] = useState(selectedBorder);
  const { level, exp, requiredExp } = calculateLevel(
    session?.user?.experience || 0
  );
  const [progress, setProgress] = useState(0);
  const [showLevelUpPopup, setShowLevelUpPopup] = useState(false);
  useEffect(() => {
    setName(session?.user?.name);
    setEmail(session?.user?.email);
    setSelectedAvatar(
      avatars.find((avatar) => avatar.id === session?.user?.avatar) ||
        avatars[0]
    );
    setSelectedBorder(
      borders.find((border) => border.id === session?.user?.border) ||
        borders[0]
    );
    setPreviewAvatar(selectedAvatar);
    setPreviewBorder(selectedBorder);
  }, [selectedAvatar, selectedBorder, session]);

  useEffect(() => {
    const percentage = (exp / requiredExp) * 100;
    setProgress(percentage);

    if (level > session?.user?.level) {
      update({ level: level });
      setShowLevelUpPopup(true);
    }
  }, [exp, requiredExp, level, session, update]);

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleAvatarChange = (avatar) => setPreviewAvatar(avatar);
  const handleBorderChange = (border) => setPreviewBorder(border);

  const handleSave = async () => {
    try {
      await update({
        name: name,
        email: email,
        avatar: previewAvatar.id,
        border: previewBorder.id,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex flex-row gap-1">
            <Card
              onClick={(e) => e.stopPropagation()}
              className="border-0 outline-none"
            >
              <CardContent className="flex flex-col items-center py-0">
                <p className="text-sm font-semibold">Level {level}</p>
                <Progress value={progress} className="w-full h-2 my-1" />
                <p className="text-xs">
                  {exp}/{requiredExp} XP
                </p>
              </CardContent>
            </Card>
            <Card className="hover:cursor-pointer py-0 border-0 outline-none">
              <CardContent className="flex items-center px-2 py-1">
                <Avatar className={selectedBorder.style}>
                  <AvatarImage src={selectedAvatar.url} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="ml-4">
                  <CardTitle className="text-base">
                    {session?.user?.name || "Loading"}
                  </CardTitle>
                  <CardDescription>
                    <FontAwesomeIcon
                      icon={faCoins}
                      size="sm"
                      className="pr-1"
                    />
                    {(session?.user?.balance || 0).toLocaleString("en-US", {
                      maximumFractionDigits: 2,
                    })}
                  </CardDescription>
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[430px]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="name"
                value={name}
                onChange={handleNameChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="email"
                value={email}
                onChange={handleEmailChange}
                type="email"
                className="col-span-3"
              />
            </div>
            <div className="flex justify-center">
              <Avatar className={`${previewBorder.style} h-32 w-32`}>
                <AvatarImage src={previewAvatar.url} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Select Avatar</h3>
              <div className="flex flex-wrap gap-4">
                {avatars
                  .filter((avatar) => avatar.requiredLevel <= level)
                  .map((avatar) => (
                    <Avatar
                      key={avatar.id}
                      className={`cursor-pointer ${
                        selectedAvatar.id === avatar.id
                          ? "ring-2 ring-blue-500"
                          : ""
                      }`}
                      onClick={() => setPreviewAvatar(avatar)}
                    >
                      <AvatarImage src={avatar.url} />
                      <AvatarFallback>{avatar.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Select Border</h3>
              <div className="flex flex-wrap gap-4">
                {borders
                  .filter((border) => border.requiredLevel <= level)
                  .map((border) => (
                    <Avatar
                      key={border.id}
                      className={`cursor-pointer ${border.style} ${
                        selectedBorder.id === border.id
                          ? "ring-2 ring-blue-500"
                          : ""
                      }`}
                      onClick={() => setPreviewBorder(border)}
                    >
                      <AvatarImage />
                      <AvatarFallback>
                        {border.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {showLevelUpPopup && (
        <LevelUpPopup
          level={level}
          unlockedAvatar={avatars.find(
            (avatar) => avatar.requiredLevel === level
          )}
          unlockedBorder={borders.find(
            (border) => border.requiredLevel === level
          )}
          onClose={() => setShowLevelUpPopup(false)}
        />
      )}
    </div>
  );
};

export default NameTag;
