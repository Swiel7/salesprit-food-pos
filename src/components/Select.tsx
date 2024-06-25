import { VariantProps, cva, cx } from "class-variance-authority";

const selectVariants = cva(
  "rounded-lg text-dark-500 transition-colors duration-300 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:opacity-10 border-gray-200 bg-white text-sm placeholder:text-gray-500 focus:border-primary-500 focus:ring-primary-500 font-normal",
  {
    variants: {
      size: {
        sm: "h-9",
        lg: "h-12",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  },
);

type SelectProps = {
  options: { label: string; value: string | number }[];
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> &
  VariantProps<typeof selectVariants>;

const Select = (props: SelectProps) => {
  const { className, options, size, ...selectProps } = props;

  return (
    <select
      className={cx(selectVariants({ size, className }))}
      {...selectProps}
    >
      {options.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};

export default Select;
