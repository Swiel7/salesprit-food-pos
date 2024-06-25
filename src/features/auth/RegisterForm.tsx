import { Link } from "react-router-dom";
import { Anchor, Button, Input, PasswordInput } from "../../components";
import { anchorStyles } from "../../components/Anchor";

type TInput = {
  name: string;
  placeholder: string;
  type: React.HTMLInputTypeAttribute;
  autoComplete?: React.HTMLInputAutoCompleteAttribute;
  error: string | string[];
};

const RegisterForm = () => {
  const inputs: TInput[] = [
    {
      name: "name",
      placeholder: "Name",
      type: "text",
      autoComplete: "name",
      error: "",
    },
    {
      name: "email",
      placeholder: "Email address",
      type: "email",
      autoComplete: "email",
      error: "",
    },
    {
      name: "phone",
      placeholder: "Phone number",
      type: "tel",
      autoComplete: "tel",
      error: "",
    },
    {
      name: "password",
      placeholder: "Password",
      type: "password",
      error: "",
    },
    {
      name: "confirmPassword",
      placeholder: "Confirm password",
      type: "password",
      error: "",
    },
  ];

  return (
    <form className="space-y-6">
      <div>
        <h1 className="text-dark-500 mb-2 text-2xl font-bold sm:text-3xl">
          Registration
        </h1>
        <p className="text-gray-500 text-sm sm:text-base">Create new account</p>
      </div>
      <div className="space-y-5">
        {inputs.map((props) =>
          props.type !== "password" ? (
            <Input key={props.name} {...props} />
          ) : (
            <PasswordInput key={props.name} {...props} />
          ),
        )}
        <p className="text-dark-500 text-sm sm:text-base">
          By signing below, you agree to the{" "}
          <Anchor href="https://www.google.pl/" target="_blank">
            Terms of use
          </Anchor>{" "}
          and{" "}
          <Anchor href="https://www.google.pl/" target="_blank">
            privacy policy
          </Anchor>
        </p>
      </div>
      <Button loading={false} className="w-full">
        Sign up
      </Button>
      <p className="text-dark-500 text-sm sm:text-base">
        Already have an account?{" "}
        <Link to="/login" className={anchorStyles}>
          Sign in
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
