/* eslint-disable react-refresh/only-export-components */
import { redirect, useLoaderData } from "react-router-dom";
import { Card, Modal } from "../components";
import { OrderSuccess, OrderTable } from "../features/order";
import { auth } from "../lib/firebase.config";
import { TOrder } from "../types/types";
import { getUserOrders } from "../api/order";

export const ordersLoader = async () => {
  await auth.authStateReady();
  const user = auth.currentUser;
  if (!user) return redirect("/login");

  return getUserOrders(user.uid);
};

const OrdersPage = () => {
  const orders = useLoaderData() as TOrder[];

  return (
    <section className="grid min-h-0 p-5 xl:p-6">
      {orders.length > 0 ? (
        <>
          <Card className="hide-scrollbar overflow-auto !p-0">
            <OrderTable orders={orders} />
          </Card>
          <Modal>
            <Modal.Container>
              <OrderSuccess />
            </Modal.Container>
          </Modal>
        </>
      ) : (
        <p className="text-dark-500">You have no orders yet</p>
      )}
    </section>
  );
};

export default OrdersPage;
