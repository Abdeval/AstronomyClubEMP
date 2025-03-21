import { UserType } from "@/lib/types";
import { jwtDecode } from "jwt-decode";
import React, { createContext, useState , useEffect } from "react";


interface UserContextType {
  user: UserType | null;
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setTokenInternal] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });

  const [user, setUser] = useState<UserType | null>(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        return jwtDecode(storedToken) as UserType;
      } catch (error) {
        console.error("Failed to decode token:", error);
        return null;
      }
    }
    return null;
  });

  const setToken = (newToken: string | null) => {
    setTokenInternal(newToken);
    if (newToken) {
      localStorage.setItem("token", newToken);
      try {
        const decoded = jwtDecode(newToken) as UserType;
        setUser(decoded);
      } catch (error) {
        console.error("Failed to decode token:", error);
        setUser(null);
      }
    } else {
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  const logout = () => {
    setToken(null);
  };

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token) as UserType;
        setUser(decoded);
      } catch (error) {
        console.error("Failed to decode token:", error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ user, setToken, token, logout }}>
      {children}
    </UserContext.Provider>
  );
};
