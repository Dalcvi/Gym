import { createContext } from 'react';
import { User } from '../user.types';

export const AuthorizedUserContext = createContext<User>({
  id: 'okay',
  age: -1,
  email: 'email',
  firstName: 'first',
  lastName: 'last',
  planEnd: '',
  planId: '',
  avatarUrl: '',
});
