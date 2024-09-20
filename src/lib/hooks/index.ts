import { useState } from 'react';

export interface IDisclosure {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}
export const useDisclosure = (defaultOpen = false): IDisclosure => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const toggle = () => (isOpen ? close() : open());

  return { isOpen, open, close, toggle };
};
