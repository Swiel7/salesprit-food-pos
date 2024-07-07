import { toast } from "react-toastify";
import { Button } from "../../components";
import { useState } from "react";
import { useAppSelector } from "../../lib/store";
import { UserService } from "../../lib/firestore-service";
import { auth } from "../../lib/firebase.config";

const CheckoutButton = () => {
  const { items } = useAppSelector((store) => store.cart);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const user = await UserService.getOne(auth.currentUser?.uid as string);

      const response = await fetch("api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems: items, user }),
      });

      if (!response.ok) throw new Error("Something went wrong...");

      const data = await response.json();
      if (data?.url) window.location.href = data.url;
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button className="w-full" onClick={handleClick} loading={isLoading}>
      Checkout
    </Button>
  );
};

export default CheckoutButton;
