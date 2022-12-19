import React from 'react';
import { Navigate } from 'react-router-dom';
import { RouteNames } from '../../router';
import { useUser } from '../use-user.hook';

export const GuestPage = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();

  if (user.type !== 'GUEST') {
    <Navigate to={RouteNames.Home.path} />;
  }

  return <>{children}</>;
};
