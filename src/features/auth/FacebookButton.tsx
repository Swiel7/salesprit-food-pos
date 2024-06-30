import { useState } from "react";
import Button, { ButtonProps } from "../../components/Button";
import { loginWithOAuth } from "../../api/user";
import { FacebookAuthProvider } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const FacebookButton = (props: ButtonProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const loginWithFacebook = async () => {
    setIsLoading(true);

    try {
      await loginWithOAuth(new FacebookAuthProvider());
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
      onClick={loginWithFacebook}
      loading={isLoading}
      {...props}
    >
      <FacebookIcon />
      Facebook
    </Button>
  );
};

export default FacebookButton;

const FacebookIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 30 30"
    >
      <path d="M15,3C8.373,3,3,8.373,3,15c0,6.016,4.432,10.984,10.206,11.852V18.18h-2.969v-3.154h2.969v-2.099c0-3.475,1.693-5,4.581-5 c1.383,0,2.115,0.103,2.461,0.149v2.753h-1.97c-1.226,0-1.654,1.163-1.654,2.473v1.724h3.593L19.73,18.18h-3.106v8.697 C22.481,26.083,27,21.075,27,15C27,8.373,21.627,3,15,3z"></path>
    </svg>
  );
};
