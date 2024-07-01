import express, { Request, Response } from "express";
import dotenv from "dotenv";
import Stripe from "stripe";
import cors from "cors";
import { TCartItem, TUser } from "./src/types/types";
import { ProductService } from "./src/lib/firestore-service";

dotenv.config();
const app = express();
const stripe = new Stripe(process.env.VITE_STRIPE_SECRET_KEY as string);
const endpointSecret = process.env.VITE_STRIPE_WEBHOOK_SECRET as string;

app.use(cors());

app.post(
  "/create-checkout-session",
  express.json(),
  async (req: Request, res: Response) => {
    const { user, cartItems } = req.body as {
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

    res.send({ url: session.url });
  },
);

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req: Request, res: Response) => {
    let event: Stripe.Event = req.body;

    if (endpointSecret) {
      try {
        const sig = req.headers["stripe-signature"] || "";
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      } catch (err) {
        return res.status(400).send(`Webhook Error: ${(err as Error).message}`);
      }
    }

    if (event.type === "checkout.session.completed") {
      const session = await stripe.checkout.sessions.retrieve(
        event.data.object.id,
        {
          expand: [
            "line_items.data.price.product",
            "payment_intent.payment_method",
          ],
        },
      );

      // create order
    }

    res.send().end();
  },
);

app.listen(process.env.VITE_SERVER_PORT, () =>
  console.log(`Node server listening on ${process.env.VITE_SERVER_PORT}!`),
);
