import * as React from 'react';
import { PropsWithChildren, createContext, FC, useContext } from 'react';
import { AuthContextValue } from './AuthContextValue';

const AuthContext = createContext<
  ReturnType<typeof AuthContextValue> | undefined
>(undefined);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const value = AuthContextValue();

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error('Auth context not used within provider');

  return context;
};
