import { cx } from "class-variance-authority";

const Card = (props: React.ComponentPropsWithoutRef<"div">) => {
  const { className, children, ...restProps } = props;

  return (
    <div
      className={cx("rounded-lg bg-white p-4 shadow sm:p-5", className)}
      {...restProps}
    >
      {children}
    </div>
  );
};

export default Card;
