"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faHouse } from '@fortawesome/free-solid-svg-icons'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import { FacebookOutlined } from '@mui/icons-material';
import { faFacebookF, faGithub, faLinkedin, faLinkedinIn, faTwitter } from "@fortawesome/free-brands-svg-icons";
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="bg-[#f3ebea] px-2 sm:px-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
           <Image width={50} height={50} src="/logo.webp" alt="logo" />
           <span className='hidden sm:block md:text-2xl' style={{fontFamily:"Lavishly Yours"}}>{"Todo List"}</span>
           </div>
        <p className='text-xs md:text-xl'>© 2024 Tekandme.All Rights Reserved.</p>
        <div className='gap-2 hidden sm:flex'>
        <span className="flex items-center justify-center h-9 w-9 border-2 border-gray-400 rounded-full cursor-pointer">
          <FontAwesomeIcon icon={faFacebookF} size="sm" />
        </span>
        <span className="flex items-center justify-center h-9 w-9 border-2 border-gray-400 rounded-full cursor-pointer">
        <Link href="https://tn.linkedin.com/company/tekandme" target='_blank'>
          <FontAwesomeIcon icon={faLinkedinIn} size="sm" />
        </Link>
        </span>
        <span className="flex items-center justify-center h-9 w-9 border-2 border-gray-400 rounded-full cursor-pointer">
          <Link href="https://tn.linkedin.com/company/tekandme" target='_blank'>
          <FontAwesomeIcon icon={faTwitter} size="sm" />
          </Link>
        </span>
        <span className="flex items-center justify-center h-9 w-9 border-2 border-gray-400 rounded-full cursor-pointer">
          <FontAwesomeIcon icon={faGithub} size="sm" />
        </span>
          </div>
  </div>
  )
}

export default Footer