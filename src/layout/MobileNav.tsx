import { Menu as MenuIcon } from "lucide-react";
import { Button, Drawer, Logo } from "../components";
import Menu from "./Menu";
import { useContext } from "react";
import { DrawerContext } from "../components/Drawer";

const MobileNav = () => {
  return (
    <Drawer>
      <Drawer.Trigger>
        <Button variant="transparent" className="xl:hidden">
          <MenuIcon />
        </Button>
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Logo />
        </Drawer.Header>
        <Drawer.Body>
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
