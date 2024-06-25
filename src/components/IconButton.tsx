import { cx } from "class-variance-authority";
import { ButtonProps, buttonVariants } from "./Button";
import { Loader2 } from "lucide-react";

const IconButton = (props: ButtonProps) => {
  const {
    children,
    className,
    variant,
    size,
    loading,
    disabled = loading,
    ...buttonProps
  } = props;

  return (
    <button
      className={cx(
        buttonVariants({
          variant,
          size,
          className: cx("aspect-square [&]:px-0", className),
        }),
      )}
      disabled={disabled}
      {...buttonProps}
    >
      {loading ? <Loader2 className="animate-spin" /> : children}
    </button>
  );
};

export default IconButton;
