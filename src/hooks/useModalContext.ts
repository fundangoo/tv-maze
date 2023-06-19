import { createContext, useContext } from 'react';

export const ModalContext = createContext<object | null>(null);

const useModalContext = () => {
  const modalContext = useContext(ModalContext);
  if (!modalContext) throw 'This component must be wrapped into a Modal.';
  return modalContext;
};

export default useModalContext;
