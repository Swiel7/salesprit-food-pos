import { MoveLeft } from "lucide-react";
import { TOrder } from "../types/types";
import { Link } from "react-router-dom";
import { buttonVariants } from "../components/Button";
import { OrderInfo, OrderItems } from "../features/order";

const OrderDetailsPage = () => {
  const order = {
    id: "#3PRGwWDewH",
    // id: "#3PRGwWDewHUrhCCR1iqd7T37",
    customer: {
      name: "Jan Kowalski",
      email: "jkowalski@gmail.com",
      id: "gffgty",
      phone: "+48566565466",
    },
    date: 1718296113000,
    paymentMethod: "card",
    status: "complete",
    total: 9959,
    address: "DFJfg 4, Rgffg, 35-100, PL",
    items: Array.from({ length: 5 }, (_, i) => ({
      id: i.toString(),
      title: "Brown eggs",
      category: "dairy",
      image: "https://i.ibb.co/nn3t0HR/Raw-Organic-Brown-Eggs-in-a-Basket.jpg",
      price: 2810,
      rating: 4.2,
      quantity: 1,
    })),
  } as TOrder;

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
