import { Eye, EyeOff } from "lucide-react";
import { useToggle } from "../hooks/useToggle";
import Button from "./Button";
import Input, { InputProps } from "./Input";

const PasswordInput = (props: InputProps) => {
  const { isOpen, toggle } = useToggle(false);

  return (
    <Input
      {...props}
      type={isOpen ? "text" : "password"}
      rightSection={
        <Button
          type="button"
          onClick={toggle}
          variant="transparent"
          className="[&]:px-0"
        >
          {isOpen ? <Eye /> : <EyeOff />}
        </Button>
      }
    />
  );
};

export default PasswordInput;
