import { TCartItem } from "../../types/types";
import { formatPrice } from "../../utils/helpers";

const OrderItem = ({ order }: { order: TCartItem }) => {
  const { title, price, image, quantity } = order;

  return (
    <article className="flex items-center gap-3">
      <img
        src={image}
        alt={title}
        className="aspect-square w-12 rounded-lg object-cover xl:w-14"
      />
      <div className="min-w-0">
        <h4 className="truncate font-medium text-dark-500">{title}</h4>
        <span className="text-sm text-gray-500">
          {quantity} x {formatPrice(price)}
        </span>
      </div>
      <span className="ml-auto font-medium text-dark-500">
        {formatPrice(quantity * price)}
      </span>
    </article>
  );
};

export default OrderItem;
