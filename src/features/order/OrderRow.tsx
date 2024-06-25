import { Eye, MapPin } from "lucide-react";
import { Badge } from "../../components";
import { TOrder } from "../../types/types";
import { formatPrice } from "../../utils/helpers";
import { Link } from "react-router-dom";
import { buttonVariants } from "../../components/Button";

const orderStatuses: Record<string, "green" | "red" | "orange"> = {
  complete: "green",
  expired: "red",
  open: "orange",
};

const OrderRow = ({ order }: { order: TOrder }) => {
  const { id, status, date, total, paymentMethod, address } = order;

  return (
    <tr className="border-b border-gray-100 text-sm text-dark-500">
      <td className="px-4 py-3 font-medium lg:px-6">{id}</td>
      <td className="md:px-4 md:py-3 lg:px-6">
        <Badge color={orderStatuses[status]} className="capitalize">
          {status}
        </Badge>
      </td>
      <td className="hidden px-4 py-3 md:table-cell lg:px-6">
        {new Date(date).toLocaleString()}
      </td>
      <td className="hidden px-4 py-3 md:table-cell lg:px-6">
        <div className="flex items-center gap-2">
          <MapPin size={20} />
          {address}
        </div>
      </td>
      <td className="hidden px-4 py-3 font-medium md:table-cell lg:px-6">
        {formatPrice(total)}
      </td>
      <td className="hidden px-4 py-3 md:table-cell lg:px-6">
        {paymentMethod}
      </td>
      <td className="py-3 pl-4 pr-1.5 text-right md:text-left lg:px-6">
        <Link
          className={buttonVariants({
            variant: "transparent",
            size: "sm",
            className: "aspect-square [&]:px-0",
          })}
          to={id}
        >
          <Eye />
        </Link>
      </td>
    </tr>
  );
};

export default OrderRow;
