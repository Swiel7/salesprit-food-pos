import { useCallback, useState } from "react";

export const useToggle = (value: boolean) => {
  const [isOpen, setIsOpen] = useState<boolean>(value);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  return { isOpen, open, close, toggle };
};
