import React, { createContext, useContext, useState } from "react";
import { getUserData } from "../services/utils";

type User = {
  token: string;
  is_staff: boolean;
};

type AuthenticationContextType = {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
};

/**
 * Context for managing user authentication state.
 */
const AuthenticationContext = createContext<AuthenticationContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

/**
 * Provider component for managing user authentication state.
 * 
 * @param children - The child components.
 */
export const AuthenticationProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(getUserData());

  const login = (userData: User) => {
    // Perform login logic, set user data, and store token in localStorage
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    // Perform logout logic, clear user data, and remove token from localStorage
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthenticationContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

/**
 * Hook for accessing authentication context.
 * 
 * @returns The authentication context object.
 */
export const useAuthentication = (): AuthenticationContextType =>
  useContext(AuthenticationContext);
