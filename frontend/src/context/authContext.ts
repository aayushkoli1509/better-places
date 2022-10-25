import { createContext } from 'react';

interface IAuthContext {
  isLoggedIn: boolean;
  login: (uid: string) => void;
  logout: () => void;
  userId: string | null;
}

export const AuthContext = createContext<IAuthContext>({
  isLoggedIn: false,
  userId: null,
  login: () => {},
  logout: () => {}
});
