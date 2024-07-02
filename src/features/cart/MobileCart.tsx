import { ShoppingCart } from "lucide-react";
import { Drawer, IconButton } from "../../components";
import { Cart } from ".";
import { useAppSelector } from "../../lib/store";
import { ButtonProps } from "../../components/Button";

const MobileCart = () => {
  return (
    <Drawer>
      <Drawer.Trigger>
        <FloatingActionButton
          variant="gray"
          className="fixed bottom-4 right-4 h-[60px] !rounded-full xl:hidden"
        />
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <h3 className="text-xl font-bold text-dark-500">Your Order</h3>
        </Drawer.Header>
        <Drawer.Body className="min-h-0">
          <Cart />
        </Drawer.Body>
      </Drawer.Content>
    </Drawer>
  );
};

export default MobileCart;

const FloatingActionButton = (props: ButtonProps) => {
  const { items } = useAppSelector((store) => store.cart);

  if (items.length < 1) return null;

  return (
    <IconButton {...props}>
      <ShoppingCart />
    </IconButton>
  );
};
