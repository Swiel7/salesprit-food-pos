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

export type TUser = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
};

export type TOrder = {
  id: string;
  customer: Omit<TUser, "avatar">;
  items: TCartItem[];
  total: number;
  status: string;
  paymentMethod: string;
  date: number;
  address: string;
};
