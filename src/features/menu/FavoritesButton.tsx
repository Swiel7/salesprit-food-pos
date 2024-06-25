import { Heart } from "lucide-react";
import { TProduct } from "../../types/types";

type FavoritesButtonProps = { product: TProduct; isFavorite: boolean };

const FavoritesButton = ({ product, isFavorite }: FavoritesButtonProps) => {
  const favorite = isFavorite;

  return (
    <form method="post" action="/favorites">
      <button
        className="absolute right-2 top-2 grid aspect-square h-7 place-items-center rounded-full bg-white"
        name="favorite"
        value={favorite ? "false" : "true"}
      >
        {favorite ? (
          <Heart size={16} className="fill-red stroke-red" />
        ) : (
          <Heart size={16} className="stroke-dark-500" />
        )}
      </button>
      <input name="product" readOnly hidden value={JSON.stringify(product)} />
    </form>
  );
};

export default FavoritesButton;
