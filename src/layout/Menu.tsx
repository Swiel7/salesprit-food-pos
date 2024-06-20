import {
  ClipboardList,
  Heart,
  IceCreamBowl,
  LogOut,
  LucideIcon,
  User,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import Button, { buttonVariants } from "../components/Button";
import { cx } from "class-variance-authority";

type TRouteItem = { label: string; path: string; icon: LucideIcon };

const routes: TRouteItem[] = [
  { label: "Menu", path: "/", icon: IceCreamBowl },
  { label: "Orders", path: "/orders", icon: ClipboardList },
  { label: "Favorites", path: "/favorites", icon: Heart },
  { label: "Account", path: "/account", icon: User },
];

const Menu = ({ onClick: handleClick }: { onClick?: () => void }) => {
  const logout = () => console.log("logout");

  return (
    <nav>
      <ul className="space-y-3">
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
        <li>
          <Button
            variant="transparent"
            onClick={() => {
              handleClick?.();
              logout();
            }}
            className="mt-auto w-full [&]:justify-start"
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
