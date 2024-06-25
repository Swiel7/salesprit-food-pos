import { ShoppingCart } from "lucide-react";
import { Drawer, IconButton } from "../../components";
import { Cart } from ".";

const MobileCart = () => {
  return (
    <Drawer>
      <Drawer.Trigger>
        <IconButton
          variant="gray"
          className="fixed bottom-4 right-4 h-[60px] !rounded-full xl:hidden"
        >
          <ShoppingCart />
        </IconButton>
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <h3 className="text-dark-500 text-xl font-bold">Your Order</h3>
        </Drawer.Header>
        <Drawer.Body className="min-h-0">
          <Cart />
        </Drawer.Body>
      </Drawer.Content>
    </Drawer>
  );
};

export default MobileCart;
