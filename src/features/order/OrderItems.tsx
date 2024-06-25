import { Card } from "../../components";
import { TCartItem } from "../../types/types";
import { formatPrice } from "../../utils/helpers";
import OrderItem from "./OrderItem";

type OrderItemsProps = { items: TCartItem[]; total: number };

const OrderItems = ({ items, total }: OrderItemsProps) => {
  return (
    <Card className="grid max-h-full min-h-0 grid-rows-[auto_1fr_auto] gap-4 !px-0">
      <h3 className="px-4 font-bold text-dark-500 sm:px-5 sm:text-lg">
        Order items
      </h3>
      <ul className="hide-scrollbar flex flex-col gap-3 overflow-y-auto px-4 text-sm sm:px-5 md:text-base">
        {items.map((order) => (
          <li key={order.id}>
            <OrderItem order={order} />
          </li>
        ))}
      </ul>
      <div className="px-4 sm:px-5">
        <div className="flex justify-between border-t border-gray-200 pt-4 font-bold text-dark-500">
          Total<span>{formatPrice(total)}</span>
        </div>
      </div>
    </Card>
  );
};

export default OrderItems;
