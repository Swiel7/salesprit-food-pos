import { cx } from "class-variance-authority";

const Card = (props: React.ComponentPropsWithoutRef<"div">) => {
  const { className, children, ...restProps } = props;

  return (
    <div
      className={cx("rounded-lg bg-white p-5 shadow", className)}
      {...restProps}
    >
      {children}
    </div>
  );
};

export default Card;
