import {
  ClipboardList,
  Heart,
  IceCreamBowl,
  LogOut,
  LucideIcon,
  User,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import Button, { buttonVariants } from "../components/Button";
import { cx } from "class-variance-authority";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase.config";

type TRouteItem = { label: string; path: string; icon: LucideIcon };

const routes: TRouteItem[] = [
  { label: "Menu", path: "/", icon: IceCreamBowl },
  { label: "Orders", path: "/orders", icon: ClipboardList },
  { label: "Favorites", path: "/favorites", icon: Heart },
  { label: "Account", path: "/account", icon: User },
];

const Menu = ({ onClick: handleClick }: { onClick?: () => void }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav className="flex grow flex-col">
      <ul className="flex grow flex-col gap-3">
        {routes.map((route) => (
          <li key={route.label}>
            <NavLink
              to={route.path}
              onClick={handleClick}
              className={({ isActive }) =>
                cx(
                  buttonVariants({
                    variant: isActive ? "primary" : "transparent",
                  }),
                  "w-full [&]:justify-start",
                )
              }
            >
              <route.icon />
              {route.label}
            </NavLink>
          </li>
        ))}
        <li className="mt-auto">
          <Button
            variant="outlined"
            onClick={() => {
              handleClick?.();
              handleLogout();
            }}
            className="w-full [&]:justify-start"
          >
            <LogOut />
            Log out
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
