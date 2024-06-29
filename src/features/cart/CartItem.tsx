import { Trash2 } from "lucide-react";
import { IconButton, Select } from "../../components";
import { TCartItem } from "../../types/types";
import { formatPrice } from "../../utils/helpers";
import { ChangeEvent } from "react";
import { useAppDispatch } from "../../lib/store";
import { setQuantity, deleteItem } from "./cart-slice";

const CartItem = ({ product }: { product: TCartItem }) => {
  const { title, price, image, id, quantity } = product;
  const dispatch = useAppDispatch();

  return (
    <article className="flex gap-3 text-sm text-dark-500 xl:text-base">
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
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            dispatch(setQuantity({ id, quantity: e.target.value }))
          }
        />
      </div>
      <div className="flex flex-col items-end">
        <span>{formatPrice(price * quantity)}</span>
        <IconButton
          size="sm"
          variant="transparent"
          onClick={() => dispatch(deleteItem(id))}
        >
          <Trash2 size={20} />
        </IconButton>
      </div>
    </article>
  );
};

export default CartItem;
