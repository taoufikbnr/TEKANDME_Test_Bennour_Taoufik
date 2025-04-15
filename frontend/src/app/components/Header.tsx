"use client"
import { Logout } from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useUser } from '../context/AuthContext';
import Cookies from "js-cookie";
import { toast } from 'react-toastify';

const Header = () => {
  const [hasToken, setHasToken] = useState<boolean>(false);
  const router = useRouter();
  const { setUserInfo } = useUser();

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("userInfo");
    
    setUserInfo({ username: "", email: "", id: "" });
    setHasToken(false);
    
    toast.success("Logged out successfully");
    router.push("/login");
  };
  
  useEffect(() => {
    const auth = Cookies.get("token");
    setHasToken(!!auth); 
  }, [router]);
  
  return (
    <div className="bg-[#f3ebea] h-[50px] shadow-md flex justify-between items-center px-10">
      <div className="flex gap-2 items-center">
        <Image width={50} height={50} src="/logo.webp" alt='logo' />
        <span style={{fontFamily:"Lavishly Yours",fontSize:26}}>
          <Link href="/">
            {"Todo List"}
          </Link>
        </span>
      </div>
      <div className="flex items-center">
        <img
          src={"/profile_img.jpg"}
          alt="profile"
          className="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
        />
        {hasToken && 
          <button 
            onClick={handleLogout} 
            className='cursor-pointer hover:text-red-400 ml-2'
            title="Logout"
          >
            <Logout/>
          </button>
        }
      </div>
    </div>
  );
};

export default Header;
