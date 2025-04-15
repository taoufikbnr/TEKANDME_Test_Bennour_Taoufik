"use client"
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<{ username: string; email: string; id: string } | null>(null);
  const [tasks, setTasks] = useState<task[]>([]);
  const [sortedTasks, setSortedTasks] = useState<task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  
  useEffect(() => {
    const storedToken = Cookies.get("token");
    const storedUserInfo = Cookies.get("userInfo");

    if (storedToken) {
      setToken(storedToken);
    }

    if (!loading && storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, [loading]);
  
  return (
    <UserContext.Provider value={{
      loading,
      setLoading,
      tasks, 
      setTasks, 
      token, 
      userInfo, 
      setToken, 
      setUserInfo,
      sortedTasks,
      setSortedTasks 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
