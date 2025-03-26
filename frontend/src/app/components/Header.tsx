"use client"
import { Logout } from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

const Header = () => {
  const router = useRouter()
  const handleLogout = () =>{
    localStorage.removeItem("token")
    router.push("/")
  }
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
          src={"./profile_img.jpg"}
          alt="profile"
          className="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
        />
      <button onClick={handleLogout} className='cursor-pointer hover:text-red-400'><Logout/></button>
      </div>
    </div>
  );
};

export default Header;
