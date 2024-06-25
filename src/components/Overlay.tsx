import { cx } from "class-variance-authority";

const Overlay = (props: React.ComponentPropsWithoutRef<"div">) => {
  const { className, ...restProps } = props;

  return (
    <div
      className={cx(
        "bg-dark-500/50 fixed inset-0 z-40 backdrop-blur-sm",
        className,
      )}
      {...restProps}
    />
  );
};

export default Overlay;
