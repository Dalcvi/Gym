import { NextUIProvider } from '@nextui-org/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Router } from './router';
import './index.scss';
import { ModalContextProvider } from './modals';
import { UserProvider } from './user';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <UserProvider>
          <ModalContextProvider>
            <Router />
          </ModalContextProvider>
        </UserProvider>
      </NextUIProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
