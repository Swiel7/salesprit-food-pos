import { CircleCheck } from "lucide-react";
import { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Modal } from "../../components";
import { useAppDispatch } from "../../lib/store";
import { clearCart } from "../cart/cart-slice";
import { ModalContext } from "../../components/Modal";

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const { open } = useContext(ModalContext);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (searchParams.get("success") === "true") {
      dispatch(clearCart());
      open();
    }
  }, [searchParams, dispatch, open]);

  return (
    <div>
      <CircleCheck className="mx-auto h-20 w-20 text-green sm:h-24 sm:w-24" />
      <div className="mb-5 mt-2.5 text-center sm:mb-7">
        <h3 className="mb-2 text-lg font-bold text-dark-500 sm:text-xl">
          Payment success
        </h3>
        <p className="text-sm text-dark-500">
          Your order has been confirmed. Thanks for shopping!
        </p>
      </div>
      <Modal.CloseButton className="w-full">Close</Modal.CloseButton>
    </div>
  );
};

export default OrderSuccess;
