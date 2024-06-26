import { ComponentPropsWithoutRef, useRef } from "react";
import { ButtonProps } from "./Button";
import IconButton from "./IconButton";

type FileButtonProps = {
  inputProps: ComponentPropsWithoutRef<"input">;
} & ButtonProps;

const FileButton = ({ inputProps, ...buttonProps }: FileButtonProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleClick = () => inputRef.current?.click();

  return (
    <>
      <IconButton onClick={handleClick} {...buttonProps} />
      <input type="file" hidden ref={inputRef} {...inputProps} />
    </>
  );
};

export default FileButton;
