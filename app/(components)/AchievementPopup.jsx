import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { Torch } from "./achievementIcons/torch";
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
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const achievements = [
  {
    unlockCondition: (user) => user.stocks.length >= 2,
    id: 1,
    icon: <Torch />,
    title: "Light the Way",
    description: "Discover your first stock.",
    locked: false,
    experience: 50,
  },
  {
    unlockCondition: (user) => user.stocks.length >= 3,
    id: 2,
    icon: <Clock />,
    title: "Timely Trader",
    description: "Make your first trade.",
    locked: false,
    experience: 50,
  },
  {
    unlockCondition: (user) => user.stocks.length >= 5,
    id: 3,
    icon: <Complete />,
    title: "Mission Accomplished",
    description: "Complete your first goal.",
    locked: false,
    experience: 50,
  },
  {
    unlockCondition: (user) => user.stocks.length >= 7,
    id: 4,
    icon: <Cup />,
    title: "Winner's Cup",
    description: "Reach the top 10% of portfolios.",
    locked: true,
    experience: 50,
  },
  {
    unlockCondition: (user) => user.stocks.length >= 8,
    id: 5,
    icon: <Finish />,
    title: "Finish Line",
    description: "Achieve a 100% return on investment.",
    locked: true,
    experience: 100,
  },
  {
    unlockCondition: (user) => user.stocks.length >= 100,
    id: 6,
    icon: <Medal />,
    title: "Medal of Honor",
    description: "Earn a spot on the leaderboard.",
    locked: true,
    experience: 50,
  },
  {
    unlockCondition: (user) => user.balance >= 8000,
    id: 7,
    icon: <Mountain />,
    title: "Summit Reached",
    description: "Grow your portfolio to $100,000.",
    locked: true,
    experience: 50,
  },
  {
    unlockCondition: (user) => user.stocks.length >= 1,
    id: 8,
    icon: <NewUser />,
    title: "Welcome, Trader!",
    description: "Create your account.",
    locked: true,
    experience: 50,
  },
  {
    unlockCondition: (user) => user.experience >= 5040,
    id: 9,
    icon: <NumberOne />,
    title: "Top Performer",
    description: "Reach the #1 spot on the leaderboard.",
    locked: true,
    experience: 50,
  },
  {
    unlockCondition: (user) => user.stocks.length >= 7440,
    id: 10,
    icon: <Ok />,
    title: "Approved",
    description: "Verify your account.",
    locked: true,
    experience: 50,
  },
  {
    unlockCondition: (user) => user.stocks.length >= 100,
    id: 11,
    icon: <Watch />,
    title: "Watchful Eye",
    description: "Add 10 stocks to your watchlist.",
    locked: true,
    experience: 50,
  },
  {
    unlockCondition: (user) => user.stocks.length >= 100,
    id: 12,
    icon: <Water />,
    title: "Liquid Assets",
    description: "Maintain a cash balance of $10,000.",
    locked: true,
    experience: 50,
  },
];

const AchievementPopup = () => {
  const { data: session, status, update } = useSession();
  const [unlockedAchievement, setUnlockedAchievement] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const checkAchievements = () => {
      const user = session?.user;
      if (!user) return;

      achievements.forEach((achievement) => {
        if (
          achievement.unlockCondition(user) &&
          !user.achievements?.includes(achievement.id)
        ) {
          setUnlockedAchievement(achievement);
          setShowPopup(true);
          let tempAchievements = session?.user.achievements;
          tempAchievements.push(achievement.id);
          let tempExperience = session?.user?.experience;
          tempExperience += achievement.experience;
          update({
            achievements: tempAchievements,
            experience: tempExperience,
          });
        }
      });
    };

    checkAchievements();
  }, [session, update]);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  if (!unlockedAchievement || !showPopup) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <Card>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
            onClick={handleClosePopup}
          >
            <X className="h-4 w-4" />
          </Button>
          <CardHeader className="flex justify-between items-center pt-0">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground">
              {unlockedAchievement.icon}
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="text-lg font-semibold">
              {unlockedAchievement.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {unlockedAchievement.description}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              +{unlockedAchievement.experience} Experience
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default AchievementPopup;
