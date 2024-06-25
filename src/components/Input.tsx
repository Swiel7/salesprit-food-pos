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
        <label htmlFor={label} className="text-dark-500 mb-1.5 block text-sm">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={label}
          className={cx(
            "border-gray-200 text-gray-500 placeholder:text-gray-500 disabled:bg-gray-500 peer block h-12 w-full rounded-lg bg-white px-4 text-sm transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-10",
            error
              ? "!border-red focus:ring-red"
              : "focus:border-primary-500 focus:ring-primary-500",
            icon && "pl-12",
            rightSection && "pr-12",
            className,
          )}
          {...inputProps}
        />
        {props.icon && (
          <props.icon className="text-gray-500 absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2" />
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
