import { Card } from "../components";
import { OrderTable } from "../features/order";
import { TOrder } from "../types/types";

const OrdersPage = () => {
  const orders = Array.from({ length: 16 }, (_, i) => ({
    id: i.toString(),
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
    items: Array.from({ length: 10 }, (_, i) => ({
      id: i.toString(),
      title: "Brown eggs",
      category: "dairy",
      image: "https://i.ibb.co/nn3t0HR/Raw-Organic-Brown-Eggs-in-a-Basket.jpg",
      price: 2810,
      rating: 4.2,
      quantity: 1,
    })),
  })) as TOrder[];

  return (
    <section className="grid min-h-0 p-5 xl:p-6">
      <Card className="hide-scrollbar overflow-auto !p-0">
        <OrderTable orders={orders} />
      </Card>
    </section>
  );
};

export default OrdersPage;
