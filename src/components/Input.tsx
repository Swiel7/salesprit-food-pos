import { cx } from "class-variance-authority";
import { LucideIcon } from "lucide-react";
import React from "react";

export type InputProps = {
  label?: string;
  icon?: LucideIcon;
  rightSection?: JSX.Element;
  error?: string | string[];
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = (props: InputProps) => {
  const { className, label, icon, error, rightSection, ...inputProps } = props;

  return (
    <div>
      {label && (
        <label htmlFor={label} className="mb-1.5 block text-sm text-dark">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={label}
          className={cx(
            "peer block h-12 w-full rounded-lg border-gray/30 bg-white px-4 text-sm text-gray transition-colors duration-300 placeholder:text-gray disabled:cursor-not-allowed disabled:bg-gray disabled:opacity-10",
            error
              ? "!border-red focus:ring-red"
              : "focus:border-primary focus:ring-primary",
            icon && "pl-12",
            rightSection && "pr-12",
            className,
          )}
          {...inputProps}
        />
        {props.icon && (
          <props.icon className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-gray" />
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
