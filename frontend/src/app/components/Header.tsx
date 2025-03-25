import Image from 'next/image';
import React from 'react';

const Header = () => {

  const profileImage = 'https://via.placeholder.com/150';

  return (
    <div className="bg-[#f3ebea] hadow-md p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
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
