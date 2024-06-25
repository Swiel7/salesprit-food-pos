import { Menu as MenuIcon } from "lucide-react";
import { Drawer, IconButton, Logo } from "../components";
import Menu from "./Menu";
import { useContext } from "react";
import { DrawerContext } from "../components/Drawer";

const MobileNav = () => {
  return (
    <Drawer>
      <Drawer.Trigger>
        <IconButton variant="transparent" className="xl:hidden">
          <MenuIcon />
        </IconButton>
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header className="!pt-5">
          <Logo />
        </Drawer.Header>
        <Drawer.Body className="!pt-4">
          <MobileMenu />
        </Drawer.Body>
      </Drawer.Content>
    </Drawer>
  );
};

export default MobileNav;

const MobileMenu = () => {
  const { close } = useContext(DrawerContext);

  return <Menu onClick={close} />;
};
