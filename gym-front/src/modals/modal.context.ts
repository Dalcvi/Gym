import React from 'react';

export type ModalFn = (close: () => void, key: number) => JSX.Element;
export type ShowModalFn = (modalFn: ModalFn) => void;

export const ModalContext = React.createContext<ShowModalFn>(() => null);
