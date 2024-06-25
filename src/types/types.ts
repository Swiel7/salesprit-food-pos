export type TProduct = {
  id: string;
  title: string;
  category: string;
  image: string;
  price: number;
  rating: number;
};

export type TCartItem = Omit<TProduct, "category" | "rating"> & {
  quantity: number;
};
