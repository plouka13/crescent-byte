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
import { NavExtend } from "./NavExtend";
import { useTheme } from "next-themes";

const Nav = () => {
  const { theme, setTheme } = useTheme();

  let pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  if (pathname === "/register") {
    return null;
  }

  const isActive = (href) => {
    return pathname === href;
  };

  const handleSignOut = () => {
    signOut();
    setTheme("dark");
  };

  return (
    <TooltipProvider>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Sheet key="left">
            <SheetTrigger asChild>
              <div className="hover:cursor-pointer group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base">
                <MoonIcon width={24} height={24} transform="scale(-1,1)" />
                <span className="sr-only">CRESCENTBYTE</span>
              </div>
            </SheetTrigger>
            <SheetContent side="left" className="w-[250px] sm:w-[250px]">
              <NavExtend />
            </SheetContent>
          </Sheet>
          <Tooltip>
            <TooltipTrigger asChild>
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
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
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
            </TooltipTrigger>
            <TooltipContent side="right">Analytics</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
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
            </TooltipTrigger>
            <TooltipContent side="right">Compare</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
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
            </TooltipTrigger>
            <TooltipContent side="right">Portfolio</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
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
            </TooltipTrigger>
            <TooltipContent side="right">Achievements</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
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
            </TooltipTrigger>
            <TooltipContent side="right">Ranking</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
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
            </TooltipTrigger>
            <TooltipContent side="right">Quiz</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
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
            </TooltipTrigger>
            <TooltipContent side="right">Subscription</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
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
            </TooltipTrigger>
            <TooltipContent side="right">Forums</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
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
            </TooltipTrigger>
            <TooltipContent side="right">Infomation</TooltipContent>
          </Tooltip>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <div onClick={handleSignOut}>
                <Link
                  href="/"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <ExitIcon width={24} height={24} />
                  <span className="sr-only">Sign Out</span>
                </Link>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">Sign Out</TooltipContent>
          </Tooltip>
        </nav>
      </aside>
    </TooltipProvider>
  );
};

export default Nav;
