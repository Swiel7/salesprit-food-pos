import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TCartItem, TProduct } from "../../types/types";
import { RootState } from "../../lib/store";

type CartState = { items: TCartItem[] };

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<TProduct>) {
      state.items.push({ ...action.payload, quantity: 1 });
    },
    deleteItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setQuantity(
      state,
      action: PayloadAction<{ id: string; quantity: string }>,
    ) {
      const { quantity, id } = action.payload;
      const product = state.items.find((item) => item.id === id);
      if (product) product.quantity = +quantity;
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const getTotalCost = (state: RootState) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);

export const { addItem, deleteItem, setQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
