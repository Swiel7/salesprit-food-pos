import { cx } from "class-variance-authority";
import Overlay from "./Overlay";
import { createPortal } from "react-dom";
import {
  ReactElement,
  ReactNode,
  cloneElement,
  createContext,
  useContext,
} from "react";
import Button, { ButtonProps } from "./Button";
import { X } from "lucide-react";
import { useToggle } from "../hooks/useToggle";

type DrawerContextType = {
  position: "left" | "right";
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const DrawerContext = createContext<DrawerContextType>(
  {} as DrawerContextType,
);

type DrawerProps = { children: ReactNode; position?: "left" | "right" };

const Drawer = (props: DrawerProps) => {
  const { children, position = "left" } = props;
  const { open, close, isOpen } = useToggle(false);

  return (
    <DrawerContext.Provider value={{ open, close, isOpen, position }}>
      {children}
    </DrawerContext.Provider>
  );
};

export default Drawer;

const Trigger = ({ children }: { children: ReactElement<ButtonProps> }) => {
  const { open } = useContext(DrawerContext);

  return <>{cloneElement(children, { onClick: open })}</>;
};

const Content = ({ children }: { children: ReactNode }) => {
  const { isOpen, position, close } = useContext(DrawerContext);

  return createPortal(
    <div
      className={cx(
        "fixed inset-0 z-30 overflow-hidden transition-all duration-500",
        isOpen ? "visible" : "invisible",
      )}
    >
      <Overlay
        className={cx(
          "transition-opacity",
          isOpen ? "opacity-100" : "opacity-0",
        )}
        onClick={close}
      />
      <div
        className={cx(
          "absolute bottom-0 top-0 z-50 flex w-80 flex-col bg-white transition-transform duration-300",
          position === "left"
            ? "left-0 -translate-x-full"
            : "right-0 translate-x-full",
          isOpen && "!translate-x-0",
        )}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
};

const Header = (props: React.ComponentPropsWithoutRef<"header">) => {
  const { className, children, ...restProps } = props;
  const { close } = useContext(DrawerContext);

  return (
    <header
      className={cx("flex items-center p-6 pb-0", className)}
      {...restProps}
    >
      {children}
      <Button variant="transparent" className="ml-auto" onClick={close}>
        <X />
      </Button>
    </header>
  );
};

const Body = (props: React.ComponentPropsWithoutRef<"div">) => {
  const { className, children, ...restProps } = props;

  return (
    <div className={cx("grow p-6", className)} {...restProps}>
      {children}
    </div>
  );
};

Drawer.Trigger = Trigger;
Drawer.Content = Content;
Drawer.Header = Header;
Drawer.Body = Body;
