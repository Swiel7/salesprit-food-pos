/* eslint-disable react-refresh/only-export-components */
import { VariantProps, cva, cx } from "class-variance-authority";
import { Loader2 } from "lucide-react";

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap gap-2.5 rounded-lg px-3 xl:px-4 leading-none transition-colors duration-300 outline-none ring-offset-2 focus-visible:ring disabled:cursor-not-allowed disabled:opacity-50 text-sm sm:text-base font-medium",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-500 text-white hover:bg-primary-400 focus-visible:bg-primary-400 ring-primary-500",
        gray: "bg-gray-200 hover:bg-gray-300 focus-visible:bg-gray-300 text-dark-500 ring-gray-300",
        transparent:
          "text-dark-500 hover:bg-dark-50 focus-visible:bg-dark-50 ring-gray-50",
        outlined:
          "border border-gray-200 hover:bg-gray-100 focus-visible:bg-gray-100 text-dark-500 ring-gray-100 bg-white",
      },
      size: {
        sm: "h-10",
        lg: "h-12",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "lg",
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
    size,
    loading,
    disabled = loading,
    ...buttonProps
  } = props;

  return (
    <button
      className={cx(buttonVariants({ variant, size, className }))}
      disabled={disabled}
      {...buttonProps}
    >
      {loading ? <Loader2 className="animate-spin" /> : children}
    </button>
  );
};

export default Button;
