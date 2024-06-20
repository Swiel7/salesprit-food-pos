import { VariantProps, cva, cx } from "class-variance-authority";
import { LucideIcon } from "lucide-react";
import React from "react";

const inputVariants = cva(
  "block peer w-full px-4 text-dark transition-colors duration-300 disabled:cursor-not-allowed disabled:bg-gray disabled:opacity-10 border-gray/30 bg-white h-12 text-sm placeholder:text-gray",
  {
    variants: {
      variant: {
        outlined: "rounded-lg",
        underline: "border-0 border-b-2 focus:ring-0",
      },
    },
    defaultVariants: {
      variant: "outlined",
    },
  },
);

export type InputProps = {
  label?: string;
  icon?: LucideIcon;
  rightSection?: JSX.Element;
  error?: string | string[];
} & React.InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputVariants>;

const Input = (props: InputProps) => {
  const {
    className,
    label,
    icon,
    error,
    variant,
    rightSection,
    placeholder,
    ...inputProps
  } = props;

  return (
    <div>
      <div className="relative">
        <input
          id={label}
          className={cx(
            inputVariants({ variant, className }),
            error
              ? "!border-red focus:ring-red"
              : "focus:border-primary focus:ring-primary",
            icon && "pl-12",
            rightSection && "pr-12",
            label && "pb-1 pt-5",
          )}
          placeholder={label ? "" : placeholder}
          {...inputProps}
        />
        {label && (
          <label
            htmlFor={label}
            className={cx(
              "absolute top-0 -z-10 origin-[0] translate-y-1 transform text-xs text-gray duration-300 peer-placeholder-shown:translate-y-[14px] peer-placeholder-shown:text-sm peer-focus:text-primary sm:peer-placeholder-shown:translate-y-3 sm:peer-placeholder-shown:text-base [&]:peer-focus:translate-y-1 [&]:peer-focus:text-xs",
              icon ? "left-12" : "left-4",
            )}
          >
            {label}
          </label>
        )}
        {props.icon && (
          <props.icon className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-dark" />
        )}
        {rightSection &&
          React.cloneElement(rightSection, {
            className: cx(
              "absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 -mr-1.5",
              rightSection.props.className,
            ),
            tabIndex: -1,
          })}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red">
          {Array.isArray(error) ? error.join(". ") : error}
        </p>
      )}
    </div>
  );
};

export default Input;
