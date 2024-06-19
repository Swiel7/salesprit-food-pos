/* eslint-disable react-refresh/only-export-components */
import { VariantProps, cva, cx } from "class-variance-authority";
import { Loader2 } from "lucide-react";

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap gap-2 rounded-lg px-3 xl:px-4 leading-none transition-colors duration-300 outline-none ring-offset-2 focus-visible:ring disabled:cursor-not-allowed disabled:opacity-50 h-12 text-sm sm:text-base",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white hover:bg-primary/90 focus-visible:bg-primary/90 ring-primary",
        gray: "bg-gray/10  hover:bg-gray/20 focus-visible:bg-gray/20 text-dark ring-gray/20",
        dark: "ring-dark/90 bg-dark text-white hover:bg-dark/90 focus-visible:bg-dark/90",
        transparent: "text-dark hover:bg-dark/5 focus-visible:bg-dark/5",
        outlined:
          "border border-gray/30  hover:bg-gray/10 focus-visible:bg-gray/10 text-dark ring-gray/10",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

export type ButtonProps = {
  loading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

const Button = (props: ButtonProps) => {
  const {
    children,
    className,
    variant,
    loading,
    disabled = loading,
    ...buttonProps
  } = props;

  return (
    <button
      className={cx(buttonVariants({ variant, className }))}
      disabled={disabled}
      {...buttonProps}
    >
      {loading ? <Loader2 className="animate-spin" /> : children}
    </button>
  );
};

export default Button;
