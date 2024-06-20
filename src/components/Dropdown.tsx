import { useToggle } from "../hooks/useToggle";
import { cx } from "class-variance-authority";
import {
  ReactElement,
  ReactNode,
  cloneElement,
  createContext,
  useContext,
} from "react";

type TriggerProps = { children: ReactElement<{ onClick: () => void }> };

type DropdownContextType = {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
};

export const DropdownContext = createContext<DropdownContextType>(
  {} as DropdownContextType,
);

const Dropdown = ({ children }: { children: ReactNode }) => {
  const { isOpen, toggle, close } = useToggle(false);

  return (
    <DropdownContext.Provider value={{ isOpen, toggle, close }}>
      <div className="relative">{children}</div>
    </DropdownContext.Provider>
  );
};

export default Dropdown;

const Trigger = ({ children }: TriggerProps) => {
  const { toggle } = useContext(DropdownContext);

  return <>{cloneElement(children, { onClick: toggle })}</>;
};

const List = (props: React.ComponentPropsWithoutRef<"ul">) => {
  const { className, children, ...restProps } = props;
  const { isOpen } = useContext(DropdownContext);

  return (
    <>
      {isOpen ? (
        <ul
          className={cx(
            "absolute left-0 top-full rounded-lg border border-gray/30 bg-white px-1 py-2 shadow-md",
            className,
          )}
          {...restProps}
        >
          {children}
        </ul>
      ) : null}
    </>
  );
};

const Item = (props: React.ComponentPropsWithoutRef<"li">) => {
  const { className, children, ...restProps } = props;
  const { close } = useContext(DropdownContext);

  return (
    <li className={className} onClick={close} {...restProps}>
      {children}
    </li>
  );
};

Dropdown.Trigger = Trigger;
Dropdown.List = List;
Dropdown.Item = Item;
