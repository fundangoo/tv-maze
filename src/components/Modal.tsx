import React, { useCallback, useEffect, useRef, useState } from 'react';
import Portal from './Portal';
import useModalContext, { ModalContext } from '../hooks/useModalContext';
import { PrimaryButton, SecondaryButton } from './Button';

interface IOverlay {
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

interface IAction {
  onAction: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  callToAction?: boolean;
}

interface IModal {
  triggerElement: React.ReactElement;
}

const Overlay: React.FC<React.PropsWithChildren<IOverlay>> = ({
  onClick,
  children,
}): JSX.Element => {
  return (
    <div className="fixed w-full h-full top-0 backdrop-blur-sm" onClick={onClick}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
};

const Header: React.FC<React.PropsWithChildren> = ({ children }): JSX.Element => {
  useModalContext();
  return <header className="text-center text-2xl p-2">{children}</header>;
};

const Content: React.FC<React.PropsWithChildren> = ({ children }): JSX.Element => {
  useModalContext();
  return <main className="p-3">{children}</main>;
};

const Footer: React.FC<React.PropsWithChildren> & FooterComposition = ({
  children,
}): JSX.Element => {
  useModalContext();
  return <footer className="flex flex-wrap gap-1 justify-end p-3">{children}</footer>;
};

const Action: React.FC<React.PropsWithChildren<IAction>> = ({
  onAction,
  callToAction,
  children,
}): JSX.Element => {
  useModalContext();
  const Button = callToAction ? PrimaryButton : SecondaryButton;
  return <Button onClick={onAction}>{children}</Button>;
};

const Modal: React.FC<React.PropsWithChildren<IModal>> & ModalComposition = ({
  triggerElement,
  children,
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        buttonRef.current?.blur();
      }
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [onClose]);

  return (
    <>
      <span onClick={onOpen}>{triggerElement}</span>
      {children && isOpen && (
        <Portal>
          <ModalContext.Provider value={{}}>
            <Overlay onClick={onClose}>
              <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-ternary rounded-lg border-2 border-primary min-w-fit max-w-[50%] max-h-[90%] overflow-y-auto">
                {children}
              </div>
            </Overlay>
          </ModalContext.Provider>
        </Portal>
      )}
    </>
  );
};

interface FooterComposition {
  Action: typeof Action;
}

interface ModalComposition {
  Header: typeof Header;
  Content: typeof Content;
  Footer: typeof Footer;
}

Modal.Header = Header;
Modal.Content = Content;
Modal.Footer = Footer;
Footer.Action = Action;

export default Modal;
