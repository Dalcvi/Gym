import { Container, Loading } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { UserContext } from './user.context';
import { LoginResponse, UserState } from './user.types';

const storageTokenId = 'user-access-token';

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserState>(() => {
    return !!localStorage.getItem(storageTokenId)
      ? {
          type: 'LOADING',
        }
      : { type: 'GUEST' };
  });
  const [tokenState, setTokenState] = useState<null | string>(null);
  const [roles, setRoles] = useState<string[]>([]);

  const setToken = (token: string, storage: 'local' | 'state') =>
    storage === 'local' ? localStorage.setItem(storageTokenId, token) : setTokenState(token);
  const logout = () => {
    setToken('', 'local');
    setToken('', 'local');
    setUser({ type: 'GUEST' });
  };

  useEffect(() => {
    if (!localStorage.getItem(storageTokenId) || user.type !== 'LOADING') {
      return;
    }

    fetch(`${process.env.REACT_APP_SERVER_URL}/auth/token-login`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        Authorization: `Bearer ${localStorage.getItem(storageTokenId)}`,
      },
      credentials: 'same-origin',
      redirect: 'manual',
    })
      .then((res) => res.json())
      .then(({ accessToken, user, roles }: LoginResponse) => {
        setToken(accessToken, 'local');
        setUser({
          type: 'AUTHORIZED',
          data: user,
        });
        setRoles(roles ?? []);
      })
      .catch((e) => {
        setUser({
          type: 'GUEST',
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (user.type === 'LOADING') {
    return (
      <Container display="flex" justify="center" alignItems="center" css={{ width: '100vw', height: '100vh' }}>
        <Loading size="xl" />
      </Container>
    );
  }

  return (
    <UserContext.Provider
      value={{
        user,
        token: localStorage.getItem(storageTokenId) ? localStorage.getItem(storageTokenId) : tokenState,
        setUser,
        setToken,
        logout,
        roles,
        setRoles,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
