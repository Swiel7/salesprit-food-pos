/* eslint-disable react-refresh/only-export-components */
import { ActionFunctionArgs, redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { Product } from "../features/menu";
import { auth } from "../lib/firebase.config";
import { WishlistService } from "../lib/firestore-service";
import { TProduct } from "../types/types";

export const favoritesLoader = async ({ request }: ActionFunctionArgs) => {
  await auth.authStateReady();
  const user = auth.currentUser;
  if (!user) return redirect("/login");

  const url = new URL(request.url);
  const search = url.searchParams.get("search");
  const wishlist = await WishlistService.getOne(user.uid);

  if (search) {
    return wishlist?.items.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase()),
    );
  }

  return wishlist?.items;
};

export const favoritesAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const isFavorite = formData.get("favorite") === "true";
  const product = JSON.parse(formData.get("product") as string) as TProduct;
  const userId = auth.currentUser!.uid;

  const wishlist = await WishlistService.getOne(userId);
  const newWishlistItems = isFavorite
    ? wishlist?.items.concat(product)
    : wishlist?.items.filter((item) => item.id !== product.id);

  await WishlistService.update(userId, { items: newWishlistItems });
  if (isFavorite) toast.success("Product added to favorites");

  return newWishlistItems;
};

const FavoritesPage = () => {
  const products = useLoaderData() as TProduct[];

  return (
    <section className="flex min-h-0 flex-col gap-6 p-5 xl:p-6">
      {products.length > 0 ? (
        <ul className="hide-scrollbar -m-3 grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4 overflow-y-auto p-3">
          {products.map((product) => (
            <li key={product.id}>
              <Product product={product} isFavorite={true} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-dark-500">Your wishlist is empty</p>
      )}
    </section>
  );
};

export default FavoritesPage;
