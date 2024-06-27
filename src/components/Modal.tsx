import {
  ReactElement,
  ReactNode,
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
} from "react";
import { useToggle } from "../hooks/useToggle";
import Button, { ButtonProps } from "./Button";
import { cx } from "class-variance-authority";

type ModalContextType = {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const ModalContext = createContext<ModalContextType>(
  {} as ModalContextType,
);

type ModalProps = { children: ReactNode; isOpen?: boolean };

const Modal = ({ children, isOpen = false }: ModalProps) => {
  const {
    open: openModal,
    close: closeModal,
    isOpen: isModalOpen,
  } = useToggle(isOpen);

  useEffect(() => {
    if (isModalOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  return (
    <ModalContext.Provider value={{ openModal, closeModal, isModalOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

export default Modal;

const Trigger = ({ children }: { children: ReactElement<ButtonProps> }) => {
  const { openModal } = useContext(ModalContext);

  return <>{cloneElement(children, { onClick: openModal })}</>;
};

const Container = (props: React.ComponentPropsWithoutRef<"dialog">) => {
  const { className, ...restProps } = props;

  const { isModalOpen } = useContext(ModalContext);
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isModalOpen) ref.current?.showModal();
    else ref.current?.close();
  }, [isModalOpen]);

  return (
    <dialog
      ref={ref}
      className={cx(
        "rounded-lg bg-white p-5 backdrop:bg-dark-500/50 backdrop:backdrop-blur-sm sm:p-6",
        className,
      )}
      {...restProps}
    />
  );
};

const CloseButton = (props: Omit<ButtonProps, "onClick">) => {
  const { closeModal } = useContext(ModalContext);

  return <Button onClick={closeModal} {...props} />;
};

const ActionButton = ({ onClick, ...restProps }: ButtonProps) => {
  const { closeModal } = useContext(ModalContext);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await onClick?.(e);
    closeModal();
  };

  return <Button onClick={handleClick} {...restProps} />;
};

Modal.Trigger = Trigger;
Modal.Container = Container;
Modal.CloseButton = CloseButton;
Modal.ActionButton = ActionButton;
