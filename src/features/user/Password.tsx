import { Form, useActionData, useNavigation } from "react-router-dom";
import { Button, Card, PasswordInput } from "../../components";
import { TPasswordErrors } from "../../schema/password-schema";
import { auth } from "../../lib/firebase.config";

const Password = () => {
  const errors = useActionData() as TPasswordErrors;
  const { state } = useNavigation();
  const isSubmitting = state === "submitting";

  const [userData] = auth.currentUser!.providerData;
  const provider = userData.providerId;

  if (provider !== "password") return null;

  return (
    <Card className="space-y-5">
      <h3 className="font-bold text-dark-500 sm:text-lg">Change password</h3>
      <Form method="post" className="space-y-5 sm:space-y-6">
        <div className="flex flex-wrap gap-x-5 gap-y-4 sm:gap-y-6 [&>*]:w-full [&>*]:grow [&>*]:sm:w-[45%] [&>*]:lg:w-[30%]">
          <PasswordInput
            name="curPassword"
            label="Current password"
            disabled={isSubmitting}
            error={errors?.curPassword?._errors}
          />
          <PasswordInput
            name="newPassword"
            label="New password"
            disabled={isSubmitting}
            error={errors?.newPassword?._errors}
          />
          <PasswordInput
            name="confirmNewPassword"
            label="Confirm new password"
            disabled={isSubmitting}
            error={errors?.confirmNewPassword?._errors}
          />
        </div>
        <Button disabled={isSubmitting} name="type" value="password">
          Update password
        </Button>
      </Form>
    </Card>
  );
};

export default Password;
