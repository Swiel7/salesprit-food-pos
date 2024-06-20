import { VariantProps, cva, cx } from "class-variance-authority";

const selectVariants = cva(
  "w-full rounded-lg px-4 text-dark transition-colors duration-300 disabled:cursor-not-allowed disabled:bg-gray disabled:opacity-10 border-gray/30 bg-white text-sm placeholder:text-gray focus:border-primary focus:ring-primary",
  {
    variants: {
      size: {
        sm: "h-10",
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
