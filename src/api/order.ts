import { nanoid } from "@reduxjs/toolkit";
import Stripe from "stripe";
import { TCartItem, TOrder } from "../types/types";
import { collection, getDocs, where, query } from "firebase/firestore";
import { OrderService } from "../lib/firestore-service.js";
import { db } from "../lib/firebase.config.js";

export const createOrder = async (session: Stripe.Checkout.Session) => {
  const paymentIntent = session.payment_intent as Stripe.PaymentIntent;
  const paymentMethod = (paymentIntent.payment_method as Stripe.PaymentMethod)
    .type;
  const orderId = nanoid(10);
  const address = session.customer_details?.address;

  const newAddress = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country,
  ]
    .filter((el) => el !== null)
    .join(", ");

  const cartItems = session.line_items?.data.map((item) => {
    const product = item.price?.product as Stripe.Product;

    const quantity = item.quantity as number;
    const price = item.price?.unit_amount as number;
    const id = product.metadata.productId;
    const image = product.images[0];
    const title = product.name;

    return { quantity, id, image, price, title };
  }) as TCartItem[];

  if ("metadata" in session && session.metadata) {
    const order: Omit<TOrder, "id"> = {
      customer: {
        id: session.metadata.userId,
        name: session.customer_details?.name || "",
        email: session.customer_details?.email || "",
        phone: session.customer_details?.phone || "",
      },
      items: cartItems,
      total: session.amount_total as number,
      status: session.status as Stripe.Checkout.Session.Status,
      paymentMethod: paymentMethod,
      date: session.created * 1000,
      address: newAddress,
    };

    await OrderService.create(order, orderId);
  }
};

export const getUserOrders = async (userId: string) => {
  const q = query(collection(db, "orders"), where("customer.id", "==", userId));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as TOrder[];
};
