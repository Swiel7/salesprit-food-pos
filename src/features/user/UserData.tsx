import { Pencil } from "lucide-react";
import { Button, Card, FileButton, Input } from "../../components";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { TUser } from "../../types/types";
import { TUserDataErrors } from "../../schema/user-data-schema";
import { useState } from "react";

const UserData = () => {
  const user = useLoaderData() as TUser;
  const errors = useActionData() as TUserDataErrors;
  const { state } = useNavigation();
  const isSubmitting = state === "submitting";

  const { avatar, name, email, phone } = user;
  const [image, setImage] = useState(avatar);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length)
      setImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <Card className="space-y-5">
      <h3 className="font-bold text-dark-500 sm:text-lg">
        Personal information
      </h3>
      <Form
        method="post"
        encType="multipart/form-data"
        className="space-y-5 sm:space-y-6"
      >
        <div className="relative inline-block">
          <img
            src={image}
            alt="Avatar"
            className="h-24 w-24 rounded-full object-cover"
            referrerPolicy="no-referrer"
          />
          <FileButton
            size="sm"
            disabled={isSubmitting}
            className="absolute bottom-0 right-0 !h-8 !rounded-full"
            inputProps={{
              name: "avatar",
              accept: "image/*",
              onChange: handleImageChange,
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
            disabled={isSubmitting}
            error={errors?.name?._errors}
          />
          <Input
            type="email"
            name="email"
            label="Email address"
            autoComplete="email"
            defaultValue={email}
            disabled={isSubmitting}
            error={errors?.email?._errors}
          />
          <Input
            type="tel"
            name="phone"
            label="Phone number"
            autoComplete="tel"
            defaultValue={phone}
            disabled={isSubmitting}
            error={errors?.phone?._errors}
          />
        </div>
        <Button disabled={isSubmitting} name="type" value="data">
          Save changes
        </Button>
      </Form>
    </Card>
  );
};

export default UserData;
