import { Card } from "../../components";
import { useAppSelector } from "../../lib/store";
import Cart from "./Cart";

const CartSidebar = () => {
  const { items } = useAppSelector((store) => store.cart);
  const isCartOpen = items.length > 0;

  return (
    <Card
      className={`hidden min-h-0 flex-col transition-all duration-300 xl:flex ${
        isCartOpen
          ? "visible ml-6 w-[370px] opacity-100"
          : "invisible w-0 px-0 opacity-0"
      } `}
    >
      <h3 className="mb-5 text-xl font-bold text-dark-500">Your Order</h3>
      <Cart />
    </Card>
  );
};

export default CartSidebar;
