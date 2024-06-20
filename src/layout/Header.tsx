import { Bell, Moon } from "lucide-react";
import { Button } from "../components";
import MobileNav from "./MobileNav";
import UserInfo from "./UserInfo";

const Header = () => {
  return (
    <header className="sticky top-0 z-20 flex gap-5 bg-white px-5 py-4 xl:static xl:px-6">
      <MobileNav />
      <div className="ml-auto flex gap-5">
        <Button variant="gray" className="hidden sm:inline-flex">
          <Bell />
        </Button>
        <Button variant="gray" className="hidden sm:inline-flex">
          <Moon />
        </Button>
        <UserInfo />
      </div>
    </header>
  );
};

export default Header;
