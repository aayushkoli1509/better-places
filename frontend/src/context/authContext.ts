import { createContext } from 'react';

interface IAuthContext {
  isLoggedIn: boolean;
  login: (uid: string, token: string) => void;
  logout: () => void;
  userId: string | null;
  token: string | null;
}

export const AuthContext = createContext<IAuthContext>({
  isLoggedIn: false,
  token: null,
  userId: null,
  login: () => {},
  logout: () => {}
});
