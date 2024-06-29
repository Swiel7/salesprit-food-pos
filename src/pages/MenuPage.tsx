/* eslint-disable react-refresh/only-export-components */
import { ActionFunctionArgs, redirect, useLoaderData } from "react-router-dom";
import { SearchBar } from "../components";
import { CartSidebar, MobileCart } from "../features/cart";
import { Categories, Product } from "../features/menu";
import { TProduct } from "../types/types";
import { ProductService, WishlistService } from "../lib/firestore-service";
import { auth } from "../lib/firebase.config";

export const menuLoader = async ({ request }: ActionFunctionArgs) => {
  await auth.authStateReady();
  const user = auth.currentUser;
  if (!user) return redirect("/login");

  const url = new URL(request.url);
  const category = url.searchParams.get("category");
  const search = url.searchParams.get("search");

  const wishlist = await WishlistService.getOne(user.uid);
  const products = await ProductService.getAll();

  if (search || (category && category !== "all")) {
    const filteredProducts = products.filter((p) => {
      if (search) return p.title.toLowerCase().includes(search.toLowerCase());
      return p.category === category;
    });

    return { products: filteredProducts, wishlistItems: wishlist?.items };
  }

  return { products, wishlistItems: wishlist?.items };
};

const MenuPage = () => {
  const { products, wishlistItems } = useLoaderData() as Record<
    "products" | "wishlistItems",
    TProduct[]
  >;

  const checkIsFavorite = (id: string) =>
    !!wishlistItems?.find((item) => item.id === id);

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
                <Product
                  product={product}
                  isFavorite={checkIsFavorite(product.id)}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-center text-dark-500">
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
