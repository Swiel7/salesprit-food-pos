import { SearchBar } from "../components";
import { Product } from "../features/menu";
import { TProduct } from "../types/types";

const FavoritesPage = () => {
  const products = Array.from({ length: 16 }, (_, i) => ({
    id: i.toString(),
    title: "Brown eggs",
    category: "dairy",
    image: "https://i.ibb.co/nn3t0HR/Raw-Organic-Brown-Eggs-in-a-Basket.jpg",
    price: 2810,
    rating: 4.2,
  })) as TProduct[];

  return (
    <section className="flex min-h-0 flex-col gap-6 p-5 xl:p-6">
      <div className="max-w-[600px]">
        <SearchBar />
      </div>
      {products.length > 0 ? (
        <ul className="hide-scrollbar -m-3 grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4 overflow-y-auto p-3">
          {products.map((product) => (
            <li key={product.id}>
              <Product product={product} isFavorite={true} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-center text-dark-500">Your wishlist is empty</p>
      )}
    </section>
  );
};

export default FavoritesPage;
