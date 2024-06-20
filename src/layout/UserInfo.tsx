import { avatar } from "../assets";
import { buttonVariants } from "../components/Button";

const UserInfo = () => {
  return (
    <div className={buttonVariants({ variant: "outlined" })}>
      <img
        src={avatar}
        alt="Avatar"
        className="h-9 w-9 rounded-full object-cover"
        referrerPolicy="no-referrer"
      />
      <span>Robert Allen</span>
    </div>
  );
};

export default UserInfo;
