import { cx } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { createPortal } from "react-dom";

const Overlay = (props: React.ComponentPropsWithoutRef<"div">) => {
  const { className, ...restProps } = props;

  return (
    <div
      className={cx(
        "fixed inset-0 z-40 bg-dark-500/50 backdrop-blur-sm",
        className,
      )}
      {...restProps}
    />
  );
};

export default Overlay;

export const LoadingOverlay = () => {
  return createPortal(
    <Overlay className="grid place-items-center">
      <Loader2 className="h-20 w-20 animate-spin text-primary-500" />
    </Overlay>,
    document.body,
  );
};
