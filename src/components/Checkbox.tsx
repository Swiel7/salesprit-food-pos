import { cx } from "class-variance-authority";

const Checkbox = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  const { className, ...checkboxProps } = props;

  return (
    <input
      type="checkbox"
      className={cx(
        "border-gray-200 text-primary-500 focus:ring-primary-500 h-5 w-5 rounded",
        className,
      )}
      {...checkboxProps}
    />
  );
};

export default Checkbox;
