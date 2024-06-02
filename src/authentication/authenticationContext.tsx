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

const AuthenticationContext = createContext<AuthenticationContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthenticationProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(getUserData());

  const login = (userData: User) => {
    // Perform login logic, set user data, and store token in localStorage
    // Example:
    // localStorage.setItem('token', userData.token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    // Perform logout logic, clear user data, and remove token from localStorage
    // Example:
    // localStorage.removeItem('token');
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthenticationContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthentication = (): AuthenticationContextType =>
  useContext(AuthenticationContext);
