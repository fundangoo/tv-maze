import React, { useId, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface IPortal {
  portalId?: string;
}

const createPortalElement = (portalId: string): HTMLElement => {
  const portalElement = document.createElement('div');
  portalElement.setAttribute('id', portalId);
  document.body.appendChild(portalElement);
  return portalElement;
};

const Portal: React.FC<React.PropsWithChildren<IPortal>> = ({
  portalId,
  children,
}): JSX.Element | null => {
  const [portal, setPortal] = useState<HTMLElement | null>(null);
  const id = useId();

  useLayoutEffect(() => {
    const containerId = portalId || id;
    let portalElement = document.getElementById(containerId);
    let portalCreated = false;
    if (!portalElement) {
      portalElement = createPortalElement(containerId);
      portalCreated = true;
    }
    setPortal(portalElement);
    return () => {
      if (portalCreated && portalElement?.parentNode) {
        portalElement.parentNode.removeChild(portalElement);
      }
    };
  }, [portalId, id]);

  return portal ? createPortal(children, portal) : null;
};

export default Portal;
