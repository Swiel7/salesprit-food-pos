import { SearchBar } from "../components";
import { Categories, Product } from "../features/menu";
import { TProduct } from "../types/types";

const MenuPage = () => {
  const products = [] as TProduct[];

  return (
    <section className="flex overflow-x-hidden p-5 xl:p-6">
      <div className="flex grow flex-col gap-6">
        <div className="max-w-[600px]">
          <SearchBar />
        </div>
        <Categories />
        {products.length > 0 ? (
          <ul className="hide-scrollbar grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4 overflow-y-auto">
            {products.map((product) => (
              <li key={product.id}>
                <Product product={product} isFavorite={true} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-center text-dark">
            No products were found matching your selection
          </p>
        )}
      </div>

      {/* Cart */}
    </section>
  );
};

export default MenuPage;
