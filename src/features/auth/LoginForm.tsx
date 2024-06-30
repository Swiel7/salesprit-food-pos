/* eslint-disable react-refresh/only-export-components */
import {
  ActionFunctionArgs,
  Form,
  Link,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { Button, Checkbox, Input, PasswordInput } from "../../components";
import FacebookButton from "./FacebookButton";
import GoogleButton from "./GoogleButton";
import { anchorStyles } from "../../components/Anchor";
import { TLoginErrors, loginSchema } from "../../schema/login-schema";
import { login } from "../../api/user";
import { toast } from "react-toastify";

export const loginAction = async ({ request }: ActionFunctionArgs) => {
  const formData = Object.fromEntries(await request.formData());
  const result = loginSchema.safeParse(formData);

  if (!result.success) return result.error.format();

  try {
    await login(result.data);
    toast.success("You have logged in successfully");
    return redirect("/");
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    }
    return null;
  }
};

const LoginForm = () => {
  const errors = useActionData() as TLoginErrors;
  const { state } = useNavigation();
  const isSubmitting = state === "submitting";

  return (
    <Form method="post" className="space-y-6">
      <div>
        <h1 className="mb-2 text-2xl font-bold text-dark-500 sm:text-3xl">
          Welcome back!
        </h1>
        <p className="text-sm text-gray-500 sm:text-base">
          Please login to your account
        </p>
      </div>
      <div className="space-y-5">
        <Input
          type="email"
          name="email"
          placeholder="Email address"
          autoComplete="email"
          disabled={isSubmitting}
          error={errors?.email?._errors}
        />
        <PasswordInput
          name="password"
          placeholder="Password"
          disabled={isSubmitting}
          error={errors?.password?._errors}
        />
        <div className="flex items-center gap-2.5">
          <Checkbox name="remember" id="remember" />
          <label
            htmlFor="remember"
            className="text-sm text-dark-500 sm:text-base"
          >
            Remember me
          </label>
        </div>
      </div>
      <Button loading={isSubmitting} className="w-full">
        Sign in
      </Button>
      <span className="flex items-center text-sm text-dark-500 before:mr-2 before:inline-block before:h-px before:grow before:bg-gray-200 after:ml-2 after:inline-block after:h-px after:grow after:bg-gray-200 sm:text-base">
        Continue with
      </span>
      <div className="flex gap-5">
        <GoogleButton className="flex-1" disabled={isSubmitting} />
        <FacebookButton className="flex-1" disabled={isSubmitting} />
      </div>
      <p className="text-sm text-dark-500 sm:text-base">
        Don't have an account?{" "}
        <Link to="/register" className={anchorStyles}>
          Sign up
        </Link>
      </p>
    </Form>
  );
};

export default LoginForm;
