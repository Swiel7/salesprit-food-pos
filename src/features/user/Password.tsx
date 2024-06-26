import { Button, Card, PasswordInput } from "../../components";

const Password = () => {
  return (
    <Card className="space-y-5">
      <h3 className="font-bold text-dark-500 sm:text-lg">Change password</h3>
      <form className="space-y-5 sm:space-y-6">
        <div className="flex flex-wrap gap-x-5 gap-y-4 sm:gap-y-6 [&>*]:w-full [&>*]:grow [&>*]:sm:w-[45%] [&>*]:lg:w-[30%]">
          <PasswordInput
            name="curPassword"
            label="Current password"
            // disabled={}
            // error={}
          />
          <PasswordInput
            name="newPassword"
            label="New password"
            // disabled={}
            // error={}
          />
          <PasswordInput
            name="cNewPassword"
            label="Confirm new password"
            // disabled={}
            // error={}
          />
        </div>
        <Button>Update password</Button>
      </form>
    </Card>
  );
};

export default Password;
