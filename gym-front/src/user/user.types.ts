export type User = {
  id: string;
  age: number;
  avatarUrl: string | null;
  email: string;
  firstName: string;
  lastName: string;
  planId: string | null;
  planEnd: string;
};

export type UserState = UserLoadingState | UserAuthorizedState | UserGuestState;

export type UserLoadingState = {
  type: 'LOADING';
};
export type UserAuthorizedState = {
  type: 'AUTHORIZED';
  data: User;
};

export type UserGuestState = {
  type: 'GUEST';
};

export type UserContextState = {
  user: UserState;
  token: string | null;
  roles: string[];
  setUser: (state: UserState) => void;
  setToken: (token: string, storage: 'local' | 'state') => void;
  setRoles: (roles: string[]) => void;
  logout: () => void;
};

export type LoginResponse = {
  accessToken: string;
  user: User;
  roles?: string[];
};
