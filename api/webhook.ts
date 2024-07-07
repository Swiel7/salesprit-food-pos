import * as dotenv from "dotenv";
import Stripe from "stripe";
import { createOrder } from "../src/api/order.js";

dotenv.config();
const stripe = new Stripe(process.env.VITE_STRIPE_SECRET_KEY as string);
const endpointSecret = process.env.VITE_STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  let event: Stripe.Event;
  const rawBody = await req.text();

  if (endpointSecret) {
    try {
      const sig = req.headers.get("stripe-signature") || "";
      event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
    } catch (err) {
      return new Response(`Webhook Error: ${(err as Error).message}`, {
        status: 400,
      });
    }
  } else {
    event = JSON.parse(rawBody);
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

    await createOrder(session);
  }

  return new Response("Payment success");
}
