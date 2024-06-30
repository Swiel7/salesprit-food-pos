/* eslint-disable react-refresh/only-export-components */
import {
  ActionFunctionArgs,
  Form,
  Link,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { Anchor, Button, Input, PasswordInput } from "../../components";
import { anchorStyles } from "../../components/Anchor";
import {
  TRegisterErrors,
  TRegisterSchema,
  registerSchema,
} from "../../schema/register-schema";
import { register } from "../../api/user";
import { toast } from "react-toastify";

type TInput = {
  name: string;
  placeholder: string;
  type: React.HTMLInputTypeAttribute;
  autoComplete?: React.HTMLInputAutoCompleteAttribute;
};

export const registerAction = async ({ request }: ActionFunctionArgs) => {
  const formData = Object.fromEntries(await request.formData());
  const result = registerSchema.safeParse(formData);

  if (!result.success) return result.error.format();

  try {
    await register(result.data);
    toast.success("You have registered successfully");
    return redirect("/");
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    }
    return null;
  }
};

const RegisterForm = () => {
  const errors = useActionData() as TRegisterErrors;
  const { state } = useNavigation();
  const isSubmitting = state === "submitting";

  const inputs: TInput[] = [
    {
      name: "name",
      placeholder: "Name",
      type: "text",
      autoComplete: "name",
    },
    {
      name: "email",
      placeholder: "Email address",
      type: "email",
      autoComplete: "email",
    },
    {
      name: "password",
      placeholder: "Password",
      type: "password",
    },
    {
      name: "confirmPassword",
      placeholder: "Confirm password",
      type: "password",
    },
  ];

  return (
    <Form method="post" className="space-y-6">
      <div>
        <h1 className="mb-2 text-2xl font-bold text-dark-500 sm:text-3xl">
          Registration
        </h1>
        <p className="text-sm text-gray-500 sm:text-base">Create new account</p>
      </div>
      <div className="space-y-5">
        {inputs.map((props) =>
          props.type !== "password" ? (
            <Input
              key={props.name}
              disabled={isSubmitting}
              error={errors?.[props.name as keyof TRegisterSchema]?._errors}
              {...props}
            />
          ) : (
            <PasswordInput
              key={props.name}
              disabled={isSubmitting}
              error={errors?.[props.name as keyof TRegisterSchema]?._errors}
              {...props}
            />
          ),
        )}
        <p className="text-sm text-dark-500 sm:text-base">
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
      <Button loading={isSubmitting} className="w-full">
        Sign up
      </Button>
      <p className="text-sm text-dark-500 sm:text-base">
        Already have an account?{" "}
        <Link to="/login" className={anchorStyles}>
          Sign in
        </Link>
      </p>
    </Form>
  );
};

export default RegisterForm;
