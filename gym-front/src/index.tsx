import { NextUIProvider } from '@nextui-org/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { NavBar } from './nav-bar/nav-bar.component';
import { Router } from './router';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <NextUIProvider>
      <NavBar />
      <Router />
    </NextUIProvider>
  </React.StrictMode>,
);
