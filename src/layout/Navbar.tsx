import { Logo } from "../components";
import Menu from "./Menu";

const Navbar = () => {
  return (
    <div className="border-gray-200 row-span-full hidden flex-col gap-6 border bg-white p-6 xl:flex">
      <div className="flex justify-center">
        <Logo />
      </div>
      <Menu />
    </div>
  );
};

export default Navbar;
