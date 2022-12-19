import { useContext } from 'react';
import { AuthorizedUserContext } from './authorized-user.context';

export const useAuthorizedUser = () => useContext(AuthorizedUserContext);
