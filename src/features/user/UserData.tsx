import { Pencil } from "lucide-react";
import { Button, Card, FileButton, Input } from "../../components";
import { TUser } from "../../types/types";

const UserData = ({ user }: { user: TUser }) => {
  const { avatar, name, email, phone } = user;

  return (
    <Card className="space-y-5">
      <h3 className="font-bold text-dark-500 sm:text-lg">
        Personal information
      </h3>
      <form className="space-y-5 sm:space-y-6">
        <div className="relative inline-block">
          <img
            src={avatar}
            alt="Avatar"
            className="h-24 w-24 rounded-full object-cover"
            referrerPolicy="no-referrer"
          />
          <FileButton
            size="sm"
            className="absolute bottom-0 right-0 !h-8 !rounded-full"
            loading={false}
            inputProps={{
              accept: "image/*",
              onChange: () => console.log("avatar changed"),
            }}
          >
            <Pencil size={16} />
          </FileButton>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-4 sm:gap-y-6 [&>*]:w-full [&>*]:grow [&>*]:sm:w-[45%] [&>*]:lg:w-[30%]">
          <Input
            name="name"
            label="Name"
            autoComplete="name"
            defaultValue={name}
            // disabled={}
            // error={}
          />
          <Input
            type="email"
            name="email"
            label="Email address"
            autoComplete="email"
            defaultValue={email}
            // disabled={}
            // error={}
          />
          <Input
            type="tel"
            name="phone"
            label="Phone number"
            autoComplete="tel"
            defaultValue={phone}
            // disabled={}
            // error={}
          />
        </div>
        <Button>Save changes</Button>
      </form>
    </Card>
  );
};

export default UserData;
