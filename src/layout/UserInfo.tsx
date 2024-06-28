import { avatar } from "../assets";
import { auth } from "../lib/firebase.config";

const UserInfo = () => {
  const user = auth.currentUser;

  return (
    <div className="flex items-center gap-2.5">
      <img
        src={user?.photoURL || avatar}
        alt="Avatar"
        className="h-10 w-10 rounded-full object-cover"
        referrerPolicy="no-referrer"
      />
      <span className="hidden text-sm font-medium text-dark-500 sm:inline">
        {user?.displayName}
      </span>
    </div>
  );
};

export default UserInfo;
