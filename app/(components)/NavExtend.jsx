"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import {
  MoonIcon,
  ExitIcon,
  Crosshair2Icon,
  RocketIcon,
  BarChartIcon,
  ArchiveIcon,
  DashboardIcon,
  InfoCircledIcon,
  GlobeIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LayersIcon } from "lucide-react";
import { IoIosGitCompare } from "react-icons/io";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useTheme } from "next-themes";

export const NavExtend = () => {
  let pathname = usePathname();
  const { theme, setTheme } = useTheme();

  if (pathname === "/") {
    return null;
  }

  if (pathname === "/register") {
    return null;
  }

  const handleSignOut = () => {
    signOut();
    setTheme("dark");
  };

  const isActive = (href) => {
    return pathname === href;
  };
  return (
    <aside className="fixed inset-y-0 left-0 hidden flex-col sm:flex">
      <nav className="flex flex-col gap-4 px-2 sm:py-5">
        <div className="flex flex-row items-center">
          <div className="hover:cursor-pointer group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base">
            <MoonIcon width={24} height={24} transform="scale(-1,1)" />
            <span className="sr-only">CRESCENTBYTE</span>
          </div>
          <div className="pl-1 text-xl font-bold">CRESCENTBYTE</div>
        </div>
        <div className="flex flex-row items-center">
          <Link
            href="/dashboard"
            className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
              isActive("/dashboard")
                ? "text-primary bg-muted/100"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <DashboardIcon width={24} height={24} />
            <span className="sr-only">Dashboard</span>
          </Link>
          <div className="pl-1">Dashboard</div>
        </div>
        <div className="flex flex-row items-center">
          <Link
            href="/analytics"
            className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
              isActive("/analytics")
                ? "text-primary bg-muted/100"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <BarChartIcon width={24} height={24} />
            <span className="sr-only">Analytics</span>
          </Link>
          <div className="pl-1">Analytics</div>
        </div>
        <div className="flex flex-row items-center">
          <Link
            href="/compare"
            className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
              isActive("/compare")
                ? "text-primary bg-muted/100"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <IoIosGitCompare className="size-7" />
            <span className="sr-only">Compare</span>
          </Link>
          <div className="pl-1">Compare</div>
        </div>
        <div className="flex flex-row items-center">
          <Link
            href="/portfolio"
            className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
              isActive("/portfolio")
                ? "text-primary bg-muted/100"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <ArchiveIcon width={24} height={24} />
            <span className="sr-only">Portfolio</span>
          </Link>
          <div className="pl-1">Portfolio</div>
        </div>
        <div className="flex flex-row items-center">
          <Link
            href="/achievements"
            className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
              isActive("/achievements")
                ? "text-primary bg-muted/100"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Crosshair2Icon width={24} height={24} />
            <span className="sr-only">Achievements</span>
          </Link>
          <div className="pl-1">Achievements</div>
        </div>
        <div className="flex flex-row items-center">
          <Link
            href="/ranking"
            className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
              isActive("/ranking")
                ? "text-primary bg-muted/100"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <LayersIcon width={24} height={24} />
            <span className="sr-only">Ranking</span>
          </Link>
          <div className="pl-1">Ranking</div>
        </div>
        <div className="flex flex-row items-center">
          <Link
            href="/quiz"
            className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
              isActive("/quiz")
                ? "text-primary bg-muted/100"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <StopwatchIcon width={24} height={24} />
            <span className="sr-only">Quiz</span>
          </Link>
          <div className="pl-1">Quiz</div>
        </div>
        <div className="flex flex-row items-center">
          <Link
            href="/subscription"
            className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
              isActive("/subscription")
                ? "text-primary bg-muted/100"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <RocketIcon width={24} height={24} />
            <span className="sr-only">Subscription</span>
          </Link>
          <div className="pl-1">Subscription</div>
        </div>
        <div className="flex flex-row items-center">
          <Link
            href="/forums"
            className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
              isActive("/forums")
                ? "text-primary bg-muted/100"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <GlobeIcon width={24} height={24} />
            <span className="sr-only">Forums</span>
          </Link>
          <div className="pl-1">Forums</div>
        </div>
        <div className="flex flex-row items-center">
          <Link
            href="/info"
            className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
              isActive("/info")
                ? "text-primary bg-muted/100"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <InfoCircledIcon width={24} height={24} />
            <span className="sr-only">Infomation</span>
          </Link>
          <div className="pl-1">Infomation</div>
        </div>
      </nav>
      <nav className="mt-auto flex flex-col gap-4 px-2 sm:py-5">
        <div>
          <div onClick={handleSignOut}>
            <div className="flex flex-row items-center">
              <Link
                href="/"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <ExitIcon width={24} height={24} />
                <span className="sr-only">Sign Out</span>
              </Link>
              <div className="pl-1">Sign Out</div>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
};
