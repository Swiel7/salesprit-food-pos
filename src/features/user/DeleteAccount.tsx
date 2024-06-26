import { Button, Card } from "../../components";

const DeleteAccount = () => {
  const handleDeleteAccount = () => console.log("account deleted");

  return (
    <Card>
      <h3 className="font-bold text-dark-500 sm:text-lg">Delete account</h3>
      <p className="mb-5 mt-3 text-sm text-dark-500 sm:mb-6">
        Once you delete your account, there is no going back. Please be certain.
      </p>
      <Button variant="outlined" onClick={handleDeleteAccount}>
        Delete your account
      </Button>
    </Card>
  );
};

export default DeleteAccount;
