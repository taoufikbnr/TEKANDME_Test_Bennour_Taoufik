"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BASE_URL } from "./utils/utils";
import { useUser } from './context/AuthContext';
import Cookies from 'js-cookie';
import HomeClient from './components/HomeClient';
import { toast } from 'react-toastify';

// Define proper types for our state
interface UserData {
  id: string;
  username: string;
  email: string;
}

export default function HomePage() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [initialTasks, setInitialTasks] = useState<task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setUserInfo } = useUser();

  // Get data on component mount
  useEffect(() => {
    const token = Cookies.get('token');
    
    // This check should be redundant with middleware, but just to be safe
    if (!token) {
      router.push('/login');
      return;
    }
    
    // Load user data
    const getUserData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: 'no-store'
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        
        const data = await response.json();
        setUserData(data);
        setUserInfo({ 
          username: data.username, 
          email: data.email, 
          id: data.id 
        });
        
        fetchTasks(token, data.id);
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error("Failed to load user data. Please try logging in again.");
        router.push('/login');
      }
    };
    
    // Fetch tasks for the user
    const fetchTasks = async (token: string, userId: string) => {
      try {
        const response = await fetch(
          `${BASE_URL}/tasks?&[filters][userId][$eq]=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            cache: 'no-store'
          }
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        
        const data = await response.json();
        setInitialTasks(data.data || []);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        toast.error("Failed to load tasks");
        setIsLoading(false);
      }
    };
    
    getUserData();
  }, [router, setUserInfo]);

  if (isLoading || !userData) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  // Make sure we have a valid token
  const currentToken = Cookies.get('token');
  if (!currentToken) {
    router.push('/login');
    return null;
  }

  return (
    <HomeClient 
      userData={userData} 
      token={currentToken} 
      initialTasks={initialTasks} 
    />
  );
}