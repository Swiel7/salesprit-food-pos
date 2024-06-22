import { Link } from "react-router-dom";
import { Button, Checkbox, Input, PasswordInput } from "../../components";
import FacebookButton from "./FacebookButton";
import GoogleButton from "./GoogleButton";
import { anchorStyles } from "../../components/Anchor";

const LoginForm = () => {
  return (
    <form className="space-y-6">
      <div>
        <h1 className="mb-2 text-2xl font-bold text-dark sm:text-3xl">
          Welcome back!
        </h1>
        <p className="text-sm text-gray sm:text-base">
          Please login to your account
        </p>
      </div>
      <div className="space-y-5">
        <Input
          type="email"
          name="email"
          placeholder="Email address"
          autoComplete="email"
          // disabled={}
          // error={}
        />
        <PasswordInput
          name="password"
          placeholder="Password"
          // disabled={}
          // error={}
        />
        <div className="flex items-center gap-2.5">
          <Checkbox name="remember" id="remember" />
          <label htmlFor="remember" className="text-sm text-dark sm:text-base">
            Remember me
          </label>
        </div>
      </div>
      <Button loading={false} className="w-full">
        Sign in
      </Button>
      <span className="flex items-center text-sm text-dark before:mr-2 before:inline-block before:h-px before:grow before:bg-gray/30 after:ml-2 after:inline-block after:h-px after:grow after:bg-gray/30 sm:text-base">
        Continue with
      </span>
      <div className="flex gap-5">
        <GoogleButton
          className="flex-1"
          // disabled={isSubmitting}
        />
        <FacebookButton
          className="flex-1"
          // disabled={isSubmitting}
        />
      </div>
      <p className="text-sm text-dark sm:text-base">
        Don't have an account?{" "}
        <Link to="/register" className={anchorStyles}>
          Sign up
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
