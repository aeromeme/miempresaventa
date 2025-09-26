import React, { createContext, useContext, useState, useCallback } from "react";
import type {
  AuthenticationResponse,
} from "../../../api";

interface User {
  roles: string[];
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (response: AuthenticationResponse) => void;
  logout: () => void;
  hasRole: (role: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = "auth_token";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Initialize token from localStorage
  const [token, setToken] = useState<string | null>(() => {
    const savedToken = localStorage.getItem(TOKEN_KEY);
    return savedToken;
  });

  const [user, setUser] = useState<User | null>(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      try {
        // Decodificar el JWT para obtener los roles
        const payload = JSON.parse(atob(token.split(".")[1]));

        const roles =
          payload.roles || payload.authorities || payload.scope?.split(" ");

        return {
          roles: Array.isArray(roles) ? roles : [roles],
        };
      } catch (e) {


        return null;
      }
    }
    return null;
  });

  const login = useCallback((response: AuthenticationResponse) => {
    if (response.token) {
      localStorage.setItem(TOKEN_KEY, response.token);
      setToken(response.token);

      try {
        const payload = JSON.parse(atob(response.token.split(".")[1]));
        const roles =
          payload.roles || payload.authorities || payload.scope?.split(" ");
        setUser({
          roles: Array.isArray(roles) ? roles : [roles],
        });
      } catch (e) {

      }
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const hasRole = useCallback(
    (role: string) => {
      return user?.roles?.includes(role) || false;
    },
    [user]
  );

  const value = {
    token,
    user,
    isAuthenticated: !!token && !!user,
    login,
    logout,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
