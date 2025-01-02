"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Torch } from "./achievementIcons/torch";
import HeaderBar from "./HeaderBar";
import { Clock } from "./achievementIcons/clock";
import { Complete } from "./achievementIcons/complete";
import { Cup } from "./achievementIcons/cup";
import { Finish } from "./achievementIcons/finish";
import { Medal } from "./achievementIcons/medal";
import { Mountain } from "./achievementIcons/mountain";
import { NewUser } from "./achievementIcons/newUser";
import { NumberOne } from "./achievementIcons/numberOne";
import { Ok } from "./achievementIcons/ok";
import { Watch } from "./achievementIcons/watch";
import { Water } from "./achievementIcons/water";
import { useSession } from "next-auth/react";

const achievements = [
  {
    id: 1,
    icon: <Torch />,
    title: "Light the Way",
    description: "Discover your first stock.",
  },
  {
    id: 2,
    icon: <Clock />,
    title: "Timely Trader",
    description: "Make your first trade.",
  },
  {
    id: 3,
    icon: <Complete />,
    title: "Mission Accomplished",
    description: "Complete your first goal.",
  },
  {
    id: 4,
    icon: <Cup />,
    title: "Winner's Cup",
    description: "Reach the top 10% of portfolios.",
  },
  {
    id: 5,
    icon: <Finish />,
    title: "Finish Line",
    description: "Achieve a 100% return on investment.",
  },
  {
    id: 6,
    icon: <Medal />,
    title: "Medal of Honor",
    description: "Earn a spot on the leaderboard.",
  },
  {
    id: 7,
    icon: <Mountain />,
    title: "Summit Reached",
    description: "Grow your portfolio to $100,000.",
  },
  {
    id: 8,
    icon: <NewUser />,
    title: "Welcome, Trader!",
    description: "Create your account.",
  },
  {
    id: 9,
    icon: <NumberOne />,
    title: "Top Performer",
    description: "Reach the #1 spot on the leaderboard.",
  },
  {
    id: 10,
    icon: <Ok />,
    title: "Approved",
    description: "Verify your account.",
  },
  {
    id: 11,
    icon: <Watch />,
    title: "Watchful Eye",
    description: "Add 10 stocks to your watchlist.",
  },
  {
    id: 12,
    icon: <Water />,
    title: "Liquid Assets",
    description: "Maintain a cash balance of $10,000.",
  },
];

export const AchievementBoard = () => {
  const { data: session, status, update } = useSession();
  const unlockedAchievements = session?.user.achievements || [];
  const unlockedCount = unlockedAchievements.length;

  // might be needed i dont think we do
  // useEffect(() => {}, [session]);
  return (
    <div>
      <HeaderBar pageName="Achievements" />
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle>
              Unlocked {unlockedCount}/{achievements.length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {achievements.map((achievement, index) => {
                const isUnlocked = unlockedAchievements.includes(
                  achievement.id
                );

                return (
                  <Card key={index} className={!isUnlocked ? "opacity-50" : ""}>
                    <CardHeader>
                      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground">
                        {achievement.icon}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <h3 className="text-lg font-semibold">
                        {achievement.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {achievement.description}
                      </p>
                      {!isUnlocked && (
                        <div className="mt-4">
                          <span className="text-sm font-semibold text-muted-foreground">
                            Locked
                          </span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
