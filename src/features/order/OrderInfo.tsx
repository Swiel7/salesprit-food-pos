import { Card } from "../../components";
import { TOrder } from "../../types/types";

const OrderInfo = ({ order }: { order: TOrder }) => {
  const { paymentMethod, customer, date, address, status } = order;
  const { name, email, phone } = customer;

  const data: { label: string; value: string }[] = [
    { label: "Name", value: name },
    { label: "Email", value: email },
    { label: "Phone", value: phone },
    { label: "Address", value: address },
    { label: "Date", value: new Date(date).toLocaleString() },
    { label: "Status", value: status },
    { label: "Payment method", value: paymentMethod },
  ];

  return (
    <Card className="space-y-4">
      <h3 className="font-bold text-dark-500 sm:text-lg">Order information</h3>
      <ul className="space-y-2.5">
        {data.map(({ label, value }) => (
          <li
            key={label}
            className="flex flex-wrap gap-4 text-xs text-dark-500 sm:text-sm md:text-base"
          >
            <span className="flex-[1] font-medium">{label}</span>
            <span className="flex-[1.5]">{value}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default OrderInfo;
