import { TriangleAlert } from "lucide-react";
import { Button, Card, Modal } from "../../components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteAccount } from "../../api/user";
import { auth } from "../../lib/firebase.config";
import { toast } from "react-toastify";

const DeleteAccount = () => {
  return (
    <Card>
      <h3 className="font-bold text-dark-500 sm:text-lg">Delete account</h3>
      <p className="mb-5 mt-3 text-sm text-dark-500 sm:mb-6">
        Once you delete your account, there is no going back. Please be certain.
      </p>
      <Modal>
        <Modal.Trigger>
          <Button variant="outlined">Delete your account</Button>
        </Modal.Trigger>
        <Modal.Container>
          <TriangleAlert className="mx-auto h-20 w-20 text-red sm:h-24 sm:w-24" />
          <div className="mb-5 mt-2.5 text-center sm:mb-7">
            <h3 className="mb-2 text-lg font-bold text-dark-500 sm:text-xl">
              Are you sure you want to delete this account ?
            </h3>
            <p className="text-sm text-dark-500">
              The account will be deleted permanently
            </p>
          </div>
          <Buttons />
        </Modal.Container>
      </Modal>
    </Card>
  );
};

export default DeleteAccount;

const Buttons = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    try {
      await deleteAccount(auth.currentUser!);
      navigate("/login");
      toast.success("User deleted successfully");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-4">
      <Modal.CloseButton variant="gray" className="flex-1" disabled={isLoading}>
        Cancel
      </Modal.CloseButton>
      <Modal.ActionButton
        className="flex-1"
        onClick={handleDeleteAccount}
        loading={isLoading}
      >
        Delete
      </Modal.ActionButton>
    </div>
  );
};
