"use client"
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface UserContextType {
  token: string | null;
  userInfo: { username: string; email: string; id: string } | null;
  setToken: (token: string) => void;
  setUserInfo: (userInfo: { username: string; email: string; id: string }) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<{ username: string; email: string; id: string } | null>(null);
  const [tasks,setTasks] = useState([]);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserInfo = localStorage.getItem("userInfo");

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);
  return (
    <UserContext.Provider value={{tasks, setTasks, token, userInfo, setToken, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access the UserContext
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
