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
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const ModalContext = createContext<ModalContextType>(
  {} as ModalContextType,
);

const Modal = ({ children }: { children: ReactNode }) => {
  const { open, close, isOpen } = useToggle(false);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <ModalContext.Provider value={{ open, close, isOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

export default Modal;

const Trigger = ({ children }: { children: ReactElement<ButtonProps> }) => {
  const { open } = useContext(ModalContext);

  return <>{cloneElement(children, { onClick: open })}</>;
};

const Container = (props: React.ComponentPropsWithoutRef<"dialog">) => {
  const { className, ...restProps } = props;

  const { isOpen } = useContext(ModalContext);
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) ref.current?.showModal();
    else ref.current?.close();
  }, [isOpen]);

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
  const { close } = useContext(ModalContext);

  return <Button onClick={close} {...props} />;
};

const ActionButton = ({ onClick, ...restProps }: ButtonProps) => {
  const { close } = useContext(ModalContext);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await onClick?.(e);
    close();
  };

  return <Button onClick={handleClick} {...restProps} />;
};

Modal.Trigger = Trigger;
Modal.Container = Container;
Modal.CloseButton = CloseButton;
Modal.ActionButton = ActionButton;
