/* eslint-disable react-refresh/only-export-components */
import { VariantProps, cva, cx } from "class-variance-authority";

export const badgeVariants = cva(
  "rounded-lg bg-opacity-10 px-3 py-2 text-center text-xs leading-none sm:py-2.5 font-medium tracking-wide",
  {
    variants: {
      color: {
        orange: "bg-primary-500 text-primary-500",
        red: "bg-red text-red",
        green: "bg-green text-green",
      },
    },
    defaultVariants: {
      color: "green",
    },
  },
);

export type BadgeProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof badgeVariants>;

const Badge = ({ className, color, ...props }: BadgeProps) => {
  return <div className={cx(badgeVariants({ color }), className)} {...props} />;
};

export default Badge;
