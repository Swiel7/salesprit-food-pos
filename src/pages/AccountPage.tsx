/* eslint-disable react-refresh/only-export-components */
import { ActionFunctionArgs, redirect } from "react-router-dom";
import { DeleteAccount, Password, UserData } from "../features/user";
import { auth } from "../lib/firebase.config";
import { UserService } from "../lib/firestore-service";
import { TUserDataSchema, userDataSchema } from "../schema/user-data-schema";
import { toast } from "react-toastify";
import { changePassword, updateUserData } from "../api/user";
import { TPasswordSchema, passwordSchema } from "../schema/password-schema";

export const accountLoader = async () => {
  await auth.authStateReady();
  const user = auth.currentUser;
  if (!user) return redirect("/login");

  return UserService.getOne(user.uid);
};

export const accountAction = async ({ request }: ActionFunctionArgs) => {
  const formData = Object.fromEntries(await request.formData());
  const type = formData.type as "password" | "data";

  const result =
    type === "data"
      ? userDataSchema.safeParse(formData)
      : passwordSchema.safeParse(formData);

  if (!result.success) return result.error.format();

  try {
    if (type === "data") {
      await updateUserData(formData as TUserDataSchema);
      toast.success("User data has been updated!");
    } else {
      const { curPassword, newPassword } = formData as TPasswordSchema;
      await changePassword(curPassword, newPassword);
      toast.success("Password changed successfully!");
    }
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    }
  }

  return null;
};

const AccountPage = () => {
  return (
    <section className="space-y-6 overflow-y-auto p-5 xl:p-6">
      <UserData />
      <Password />
      <DeleteAccount />
    </section>
  );
};

export default AccountPage;
