"use clinet";

import Chat from "./Chat";
import EarnCoinsButton from "./EarnCoinsButton";
import NameTag from "./NameTag";
import { ModeToggle } from "./ThemeToggle";

export const HeaderBar = ({ pageName }) => {
  return (
    <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4 py-8">
      <h1 className="text-xl font-semibold flex-grow">{pageName}</h1>
      <div className="flex flex-row">
        <div className="flex items-center pr-2">
          <EarnCoinsButton />
        </div>
        <div className="flex items-center pr-2">
          <ModeToggle />
        </div>
        <div className="flex items-center pr-2">
          <Chat />
        </div>
        <NameTag />
      </div>
    </header>
  );
};

export default HeaderBar;
