import { formatPrice } from "../../utils/helpers";
import { CartItem, CheckoutButton } from ".";
import { useAppSelector } from "../../lib/store";
import { getTotalCost } from "./cart-slice";

const Cart = () => {
  const { items } = useAppSelector((store) => store.cart);
  const totalCost = useAppSelector(getTotalCost);

  return (
    <div className="grid min-h-0 grow grid-rows-[1fr_auto_auto]">
      <ul className="hide-scrollbar flex flex-col gap-3 overflow-y-auto xl:gap-4">
        {items.map((item) => (
          <li key={item.id}>
            <CartItem product={item} />
          </li>
        ))}
      </ul>
      <div className="mt-1.5 flex items-center justify-between border-t border-gray-200 py-3 font-bold text-dark-500 xl:mt-4 xl:py-4 xl:text-lg">
        Total
        <span className="text-xl xl:text-2xl">{formatPrice(totalCost)}</span>
      </div>
      <CheckoutButton />
    </div>
  );
};

export default Cart;
