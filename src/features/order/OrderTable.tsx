import OrderRow from "./OrderRow";
import { TOrder } from "../../types/types";

const OrderTable = ({ orders }: { orders: TOrder[] }) => {
  return (
    <table className="w-full text-left">
      <thead className="sticky top-0 hidden border-b border-gray-100 bg-white md:table-header-group">
        <tr>
          {[
            "Order",
            "Status",
            "Date",
            "Address",
            "Total",
            "Payment",
            "Action",
          ].map((label) => (
            <th
              key={label}
              className="p-4 pt-5 font-medium text-dark-500 lg:px-6"
            >
              {label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <OrderRow key={order.id} order={order} />
        ))}
      </tbody>
    </table>
  );
};

export default OrderTable;
