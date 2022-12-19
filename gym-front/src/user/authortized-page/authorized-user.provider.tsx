import React from 'react';
import { Navigate } from 'react-router-dom';
import { RouteNames } from '../../router';
import { useUser } from '../use-user.hook';
import { AuthorizedUserContext } from './authorized-user.context';

export const AuthorizedUserProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();

  if (user.type !== 'AUTHORIZED') {
    return <Navigate to={RouteNames.Home.path} />;
  }

  return <AuthorizedUserContext.Provider value={user.data}>{children}</AuthorizedUserContext.Provider>;
};
