import { TCartItem } from "../../types/types";
import { formatPrice } from "../../utils/helpers";
import { CartItem, CheckoutButton } from ".";

const Cart = () => {
  const items = Array.from({ length: 2 }, (_, i) => ({
    id: i.toString(),
    title: "Brown eggs",
    category: "dairy",
    image: "https://i.ibb.co/nn3t0HR/Raw-Organic-Brown-Eggs-in-a-Basket.jpg",
    price: 2810,
    rating: 4.2,
    quantity: 1,
  })) as TCartItem[];
  const totalCost = 121;

  return (
    <div className="grid min-h-0 grow grid-rows-[1fr_auto_auto]">
      <ul className="hide-scrollbar flex flex-col gap-3 overflow-y-auto xl:gap-4">
        {items.map((item) => (
          <li key={item.id}>
            <CartItem product={item} />
          </li>
        ))}
      </ul>
      <div className="border-gray-200 text-dark-500 mt-1.5 flex items-center justify-between border-t py-3 font-bold xl:mt-4 xl:py-4 xl:text-lg">
        Total
        <span className="text-xl xl:text-2xl">{formatPrice(totalCost)}</span>
      </div>
      <CheckoutButton />
    </div>
  );
};

export default Cart;
