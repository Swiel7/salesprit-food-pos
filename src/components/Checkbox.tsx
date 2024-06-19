import { cx } from "class-variance-authority";

const Checkbox = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  const { className, ...checkboxProps } = props;

  return (
    <input
      type="checkbox"
      className={cx(
        "h-5 w-5 rounded border-gray/30 text-primary focus:ring-primary",
        className,
      )}
      {...checkboxProps}
    />
  );
};

export default Checkbox;
