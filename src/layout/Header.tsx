import { Bell, Moon } from "lucide-react";
import { IconButton } from "../components";
import MobileNav from "./MobileNav";
import UserInfo from "./UserInfo";
import { useMatches } from "react-router-dom";

const Header = () => {
  const matches = useMatches();
  const title = (matches[matches.length - 1].handle as { title: string }).title;

  return (
    <header className="border-gray-100 sticky top-0 z-20 flex items-center justify-between gap-5 border bg-white py-2 pl-2 pr-5 xl:static xl:px-6 xl:py-3">
      <MobileNav />
      <h1 className="text-dark-500 text-xl font-bold sm:text-2xl">{title}</h1>
      <div className="flex gap-5">
        <div className="hidden md:flex">
          <IconButton variant="transparent">
            <Bell />
          </IconButton>
          <IconButton variant="transparent">
            <Moon />
          </IconButton>
        </div>
        <UserInfo />
      </div>
    </header>
  );
};

export default Header;
