export type Disclosure = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};
