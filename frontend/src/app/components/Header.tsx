import Image from 'next/image';
import React from 'react';

const Header = () => {

  const profileImage = 'https://via.placeholder.com/150';

  return (
    <div className="bg-[#f3ebea] h-[50px] shadow-md flex justify-between items-center">
      <div className="flex items-center">
        {/* <Image src="" /> */}
        <span>{"Todo List"}</span>
      </div>
      <div className="flex items-center">
        <img
          src={profileImage}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
        />
      </div>
    </div>
  );
};

export default Header;
