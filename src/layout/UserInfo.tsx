import { avatar } from "../assets";

const UserInfo = () => {
  return (
    <div className="flex items-center gap-2.5">
      <img
        src={avatar}
        alt="Avatar"
        className="h-10 w-10 rounded-full object-cover"
        referrerPolicy="no-referrer"
      />
      <span className="hidden text-sm text-dark sm:inline">Robert Allen</span>
    </div>
  );
};

export default UserInfo;
