import { useState } from "react";
import Button, { ButtonProps } from "../../components/Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { loginWithGoogle } from "../../api/user";

const GoogleButton = (props: ButtonProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleClick = async () => {
    setIsLoading(true);

    try {
      await loginWithGoogle();
      toast.success("You have logged in successfully");
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outlined"
      type="button"
      onClick={handleClick}
      loading={isLoading}
      {...props}
    >
      <GoogleIcon />
      Google
    </Button>
  );
};

export default GoogleButton;

const GoogleIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 30 30"
    >
      <path d="M 15.003906 3 C 8.3749062 3 3 8.373 3 15 C 3 21.627 8.3749062 27 15.003906 27 C 25.013906 27 27.269078 17.707 26.330078 13 L 25 13 L 22.732422 13 L 15 13 L 15 17 L 22.738281 17 C 21.848702 20.448251 18.725955 23 15 23 C 10.582 23 7 19.418 7 15 C 7 10.582 10.582 7 15 7 C 17.009 7 18.839141 7.74575 20.244141 8.96875 L 23.085938 6.1289062 C 20.951937 4.1849063 18.116906 3 15.003906 3 z"></path>
    </svg>
  );
};
