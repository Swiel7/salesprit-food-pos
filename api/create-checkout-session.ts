import * as dotenv from "dotenv";
import Stripe from "stripe";
import { ProductService } from "../src/lib/firestore-service.js";
import { TCartItem, TUser } from "../src/types/types";

dotenv.config();
const stripe = new Stripe(process.env.VITE_STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  const { user, cartItems } = (await req.json()) as {
    cartItems: TCartItem[];
    user: TUser;
  };

  const cartItemsIds = cartItems.map(({ id }) => id);

  const cartItemsQuantity = cartItems.reduce(
    (acc, { id, quantity }) => {
      acc[id] = quantity;
      return acc;
    },
    {} as Record<string, number>,
  );

  const products = (await ProductService.getAll()).filter(({ id }) =>
    cartItemsIds.includes(id),
  );

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
    products.map(({ title, price, image, id }) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: title,
          images: [image],
          metadata: {
            productId: id,
          },
        },
        unit_amount: price,
      },
      quantity: cartItemsQuantity[id],
    }));

  const session = await stripe.checkout.sessions.create({
    customer_email: user.email,
    line_items,
    mode: "payment",
    payment_method_types: ["card", "paypal"],
    phone_number_collection: { enabled: true },
    shipping_address_collection: { allowed_countries: ["US", "GB", "PL"] },
    metadata: { userId: user.id },
    success_url: `${process.env.VITE_APP_URL}/orders?success=true`,
    cancel_url: `${process.env.VITE_APP_URL}?canceled=true`,
  });

  return new Response(JSON.stringify({ url: session.url }));
}
