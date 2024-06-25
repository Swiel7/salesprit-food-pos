import { Plus, Star } from "lucide-react";
import { TProduct } from "../../types/types";
import FavoritesButton from "./FavoritesButton";
import { formatPrice } from "../../utils/helpers";
import { Card, IconButton } from "../../components";

type ProductProps = { product: TProduct; isFavorite: boolean };

const Product = ({ product, isFavorite }: ProductProps) => {
  const { title, image, price, rating } = product;

  const handleAddToCart = () => {
    console.log("Product added to cart");
  };

  return (
    <Card className="relative !p-3 text-sm sm:text-base">
      <div className="relative aspect-video overflow-hidden rounded-lg">
        <img src={image} alt={title} className="h-full w-full object-cover" />
        <FavoritesButton product={product} isFavorite={isFavorite} />
      </div>
      <div className="mt-4 flex flex-col gap-1">
        <h3 className="text-dark-500 truncate font-medium">{title}</h3>
        <div className="flex">
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              key={index}
              size={16}
              className={
                index < Math.round(rating)
                  ? "fill-primary-500 stroke-primary-500"
                  : "fill-gray-500 stroke-gray-500"
              }
            />
          ))}
        </div>
        <span className="text-dark-500">{formatPrice(price)}</span>
      </div>
      <IconButton
        onClick={handleAddToCart}
        className="absolute bottom-3 right-3"
        size="sm"
      >
        <Plus />
      </IconButton>
    </Card>
  );
};

export default Product;
