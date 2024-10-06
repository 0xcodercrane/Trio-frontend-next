import { useState } from 'react';
import { Disclosure } from './disclosure.types';
export const useDisclosure = (defaultOpen = false): Disclosure => {
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

export type { Disclosure };

export default useDisclosure;
