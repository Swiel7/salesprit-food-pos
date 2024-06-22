import { Logo } from "../components";
import Menu from "./Menu";

const Navbar = () => {
  return (
    <div className="row-span-full hidden flex-col gap-6 border border-gray/20 bg-white p-6 xl:flex">
      <div className="flex justify-center">
        <Logo />
      </div>
      <Menu />
    </div>
  );
};

export default Navbar;
