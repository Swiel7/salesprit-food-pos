import { cx } from "class-variance-authority";

const Overlay = (props: React.ComponentPropsWithoutRef<"div">) => {
  const { className, ...restProps } = props;

  return (
    <div
      className={cx(
        "fixed inset-0 z-40 bg-gray/20 backdrop-blur-sm",
        className,
      )}
      {...restProps}
    />
  );
};

export default Overlay;
