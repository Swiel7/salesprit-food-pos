import { Logo } from "../components";
import Menu from "./Menu";

const Navbar = () => {
  return (
    <div className="row-span-full hidden space-y-3 border border-gray/20 bg-white p-6 pt-0 xl:block">
      <div className="flex h-20 items-center justify-center">
        <Logo />
      </div>
      <Menu />
    </div>
  );
};

export default Navbar;
