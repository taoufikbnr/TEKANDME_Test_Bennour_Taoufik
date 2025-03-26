"use client"
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";



const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<{ username: string; email: string; id: string } | null>(null);
  const [tasks,setTasks] = useState<task[]>([]);
  const [sortedTasks,setSortedTasks] = useState<task[]>([]);
  const [loading,setloading] = useState<boolean>(false);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserInfo = localStorage.getItem("userInfo");

    if (storedToken) {
      setToken(storedToken);
    }

    if (!loading&&storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);
  return (
    <UserContext.Provider value={{loading,setloading,tasks, setTasks, token, userInfo, setToken, setUserInfo,sortedTasks,setSortedTasks }}>
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
