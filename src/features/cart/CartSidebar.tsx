import { Card } from "../../components";
import Cart from "./Cart";

const CartSidebar = () => {
  const isCartOpen: boolean = true;

  return (
    <Card
      className={`hidden min-h-0 flex-col transition-all duration-300 xl:flex ${
        isCartOpen
          ? "visible ml-6 w-[370px] opacity-100"
          : "invisible w-0 px-0 opacity-0"
      } `}
    >
      <h3 className="text-dark-500 mb-5 text-xl font-bold">Your Order</h3>
      <Cart />
    </Card>
  );
};

export default CartSidebar;
