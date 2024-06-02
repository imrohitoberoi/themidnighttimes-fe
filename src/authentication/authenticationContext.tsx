import React, { createContext, useContext, useState } from "react";

interface User {
  token: string;
  is_staff: boolean;
}

interface AuthenticationContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthenticationContext = createContext<AuthenticationContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthenticationProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const loggedInUserData = localStorage.getItem("user");
  const [user, setUser] = useState<User | null>(
    loggedInUserData ? JSON.parse(loggedInUserData) : null
  );

  const login = (userData: User) => {
    // Perform login logic, set user data, and store token in localStorage
    // Example:
    // localStorage.setItem('token', userData.token);
    setUser(userData);
  };

  const logout = () => {
    // Perform logout logic, clear user data, and remove token from localStorage
    // Example:
    // localStorage.removeItem('token');
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
