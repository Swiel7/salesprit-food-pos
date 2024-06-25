import { SearchBar } from "../components";
import { CartSidebar, MobileCart } from "../features/cart";
import { Categories, Product } from "../features/menu";
import { TProduct } from "../types/types";

const MenuPage = () => {
  const products = Array.from({ length: 16 }, (_, i) => ({
    id: i.toString(),
    title: "Brown eggs",
    category: "dairy",
    image: "https://i.ibb.co/nn3t0HR/Raw-Organic-Brown-Eggs-in-a-Basket.jpg",
    price: 2810,
    rating: 4.2,
  })) as TProduct[];

  return (
    <section className="flex min-h-0 overflow-x-hidden p-5 xl:p-6">
      <div className="flex min-h-0 grow flex-col gap-6">
        <div className="max-w-[600px]">
          <SearchBar />
        </div>
        <Categories />
        {products.length > 0 ? (
          <ul className="hide-scrollbar -m-3 grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4 overflow-y-auto p-3">
            {products.map((product) => (
              <li key={product.id}>
                <Product product={product} isFavorite={true} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-dark-500 mt-4 text-center">
            No products were found matching your selection
          </p>
        )}
      </div>
      <CartSidebar />
      <MobileCart />
    </section>
  );
};

export default MenuPage;
