/* eslint-disable react-refresh/only-export-components */
import { MoveLeft } from "lucide-react";
import { TOrder } from "../types/types";
import {
  ActionFunctionArgs,
  Link,
  json,
  useLoaderData,
} from "react-router-dom";
import { buttonVariants } from "../components/Button";
import { OrderInfo, OrderItems } from "../features/order";
import { OrderService } from "../lib/firestore-service";

export const orderDetailsLoader = async ({ params }: ActionFunctionArgs) => {
  const orderId = params.orderId!;
  const order = await OrderService.getOne(orderId);

  if (!order) throw json("Not found", { status: 404 });
  return order;
};

const OrderDetailsPage = () => {
  const order = useLoaderData() as TOrder;

  return (
    <section className="flex min-h-0 flex-col gap-2 p-5 sm:gap-4 xl:p-6">
      <header className="flex items-center justify-between">
        <h2 className="font-bold text-dark-500 sm:text-xl">Order {order.id}</h2>
        <Link
          className={buttonVariants({ variant: "transparent", size: "sm" })}
          to="/orders"
        >
          <MoveLeft />
          Back
        </Link>
      </header>
      <div className="grid min-h-0 items-start gap-6 lg:grid-cols-2">
        <OrderItems items={order.items} total={order.total} />
        <OrderInfo order={order} />
      </div>
    </section>
  );
};

export default OrderDetailsPage;
