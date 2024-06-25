import { Trash2 } from "lucide-react";
import { IconButton, Select } from "../../components";
import { TCartItem } from "../../types/types";
import { formatPrice } from "../../utils/helpers";

const CartItem = ({ product }: { product: TCartItem }) => {
  const { title, price, image, quantity } = product;

  return (
    <article className="text-dark-500 flex gap-3 text-sm xl:text-base">
      <img
        src={image}
        alt={title}
        className="h-[60px] w-[60px] rounded-lg object-cover xl:h-16 xl:w-16"
      />
      <div className="min-w-0 grow">
        <h4 className="mb-1 truncate font-medium">{title}</h4>
        <Select
          size="sm"
          options={Array.from({ length: 10 }, (_, i) => ({
            label: (i + 1).toString(),
            value: i + 1,
          }))}
          value={quantity}
          onChange={() => console.log("change quantity")}
        />
      </div>
      <div className="flex flex-col items-end">
        <span>{formatPrice(price * quantity)}</span>
        <IconButton
          size="sm"
          variant="transparent"
          onClick={() => console.log("delete item")}
        >
          <Trash2 size={20} />
        </IconButton>
      </div>
    </article>
  );
};

export default CartItem;
