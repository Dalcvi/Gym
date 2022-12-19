import React, { FC, ReactNode, useCallback, useRef, useState } from 'react';
import { ModalContext, ShowModalFn, ModalFn } from './modal.context';

type ModalContextProviderProps = {
  children: React.ReactNode;
};

export const ModalContextProvider: FC<ModalContextProviderProps> = ({ children }) => {
  const [modals, setModals] = useState<{ [key: number]: JSX.Element }>({});
  const modalsAddedCounter = useRef(0);

  const close = useCallback(
    (index: number) => {
      setModals((m) => {
        const { [index]: closedModal, ...restModals } = m;
        if (Object.values(restModals).length === 0) {
          document.body.style.overflow = '';
        }
        return restModals;
      });
    },
    [setModals],
  );

  const showModal: ShowModalFn = useCallback(
    (modalFn: ModalFn) => {
      modalsAddedCounter.current++;
      setModals((m) => ({
        ...m,
        [modalsAddedCounter.current]: modalFn(() => close(modalsAddedCounter.current), modalsAddedCounter.current),
      }));
    },
    [close],
  );
  const modalElements = Object.values(modals);
  console.log(modalElements);
  return (
    <ModalContext.Provider value={showModal}>
      {children}
      {modalElements}
    </ModalContext.Provider>
  );
};
