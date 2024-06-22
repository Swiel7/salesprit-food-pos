import { Plus, Star } from "lucide-react";
import { TProduct } from "../../types/types";
import FavoritesButton from "./FavoritesButton";
import { cx } from "class-variance-authority";
import { formatPrice } from "../../utils/helpers";
import { Button } from "../../components";

type ProductProps = { product: TProduct; isFavorite: boolean };

const Product = ({ product, isFavorite }: ProductProps) => {
  const { title, image, price, rating } = product;

  const handleAddToCart = () => {
    console.log("Product added to cart");
  };

  return (
    <article className="relative rounded-lg bg-white p-3 text-sm sm:text-base">
      <div className="relative aspect-video overflow-hidden rounded-lg">
        <img src={image} alt={title} className="h-full w-full object-cover" />
        <FavoritesButton product={product} isFavorite={isFavorite} />
      </div>
      <div className="mt-4 flex flex-col gap-1.5">
        <h3 className="truncate font-bold leading-none text-dark">{title}</h3>
        <div className="flex">
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              key={index}
              className={cx(
                "inline-block",
                index < Math.round(rating) ? "fill-primary" : "fill-gray",
              )}
            />
          ))}
        </div>
        <span className="font-bold text-dark">{formatPrice(price)}</span>
      </div>
      <Button onClick={handleAddToCart} className="absolute bottom-3 right-3">
        <Plus />
      </Button>
    </article>
  );
};

export default Product;
