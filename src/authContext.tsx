import { createContext, useContext, useState } from "react";
interface AuthContextProps {
  accessToken: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  storeData: (
    token: string | null,
    isAuth: boolean,
    userIsAdmin: boolean
  ) => void | undefined;
}

interface Auth0ProviderProps {
  children: JSX.Element;
}

const AuthContext = createContext<Partial<AuthContextProps>>({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: Auth0ProviderProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const storeData = (
    token: String | null,
    isAuth: boolean,
    userIsAdmin: boolean
  ) => {
    if (typeof token === "string") {
      setAccessToken(token);
      setIsAdmin(userIsAdmin);
      setIsAuthenticated(isAuth);
    } else {
      console.error("Invalid token type.");
    }
  };

  const contextValue: AuthContextProps = {
    accessToken,
    isAuthenticated,
    isAdmin,
    storeData
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
