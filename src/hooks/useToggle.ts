import { useState } from "react";

export const useToggle = (value: boolean) => {
  const [isOpen, setIsOpen] = useState<boolean>(value);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((v) => !v);

  return { isOpen, open, close, toggle };
};
