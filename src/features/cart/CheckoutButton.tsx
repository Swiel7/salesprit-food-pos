import { Button } from "../../components";

const CheckoutButton = () => {
  const handleClick = () => console.log("checkout");

  return (
    <Button className="w-full" onClick={handleClick} loading={false}>
      Checkout
    </Button>
  );
};

export default CheckoutButton;
