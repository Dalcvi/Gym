import { createContext } from 'react';
import { UserContextState } from './user.types';

export const UserContext = createContext<UserContextState>({
  user: { type: 'LOADING' },
  token: null,
  roles: [],
  setUser: (state) => {},
  setToken: (token, storage) => {},
  setRoles: (roles) => {},
  logout: () => {},
});
