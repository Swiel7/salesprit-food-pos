import { cx } from "class-variance-authority";

export const anchorStyles =
  "text-primary-500 underline-offset-[5px] hover:underline outline-primary-500 outline-offset-2";

const Anchor = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const { children, className, ...anchorProps } = props;

  return (
    <a className={cx(anchorStyles, className)} {...anchorProps}>
      {children}
    </a>
  );
};

export default Anchor;
