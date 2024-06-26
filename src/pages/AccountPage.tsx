import { avatar } from "../assets";
import { DeleteAccount, Password, UserData } from "../features/user";
import { TUser } from "../types/types";

const AccountPage = () => {
  const user: TUser = {
    id: "gffgty",
    name: "Jan Kowalski",
    email: "jkowalski@gmail.com",
    phone: "+48566565466",
    avatar: avatar,
  };

  return (
    <section className="space-y-6 overflow-y-auto p-5 xl:p-6">
      <UserData user={user} />
      <Password />
      <DeleteAccount />
    </section>
  );
};

export default AccountPage;
