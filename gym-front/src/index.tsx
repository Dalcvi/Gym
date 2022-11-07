import { NextUIProvider } from '@nextui-org/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { NavBar } from './nav-bar/nav-bar.component';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Router } from './router';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <NavBar />
        <Router />
      </NextUIProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
