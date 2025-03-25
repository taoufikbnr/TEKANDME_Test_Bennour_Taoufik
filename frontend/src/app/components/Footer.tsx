"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faHouse } from '@fortawesome/free-solid-svg-icons'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import { FacebookOutlined } from '@mui/icons-material';
import { faFacebookF, faGithub, faLinkedin, faLinkedinIn, faTwitter } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className="bg-[#f3ebea] p-8 flex justify-between items-center">
        <div className="flex items-center space-x-4">
                <span>{"Todo List"}</span>
        </div>
        <p>© 2023 Tekandme.All Rights Reserved.</p>
        <div className='flex gap-2'>
        <span className="flex items-center justify-center h-9 w-9 border-2 border-gray-400 rounded-full">
          <FontAwesomeIcon icon={faFacebookF} size="sm" />
        </span>
        <span className="flex items-center justify-center h-9 w-9 border-2 border-gray-400 rounded-full">
          <FontAwesomeIcon icon={faLinkedinIn} size="sm" />
        </span>
        <span className="flex items-center justify-center h-9 w-9 border-2 border-gray-400 rounded-full">
          <FontAwesomeIcon icon={faTwitter} size="sm" />
        </span>
        <span className="flex items-center justify-center h-9 w-9 border-2 border-gray-400 rounded-full">
          <FontAwesomeIcon icon={faGithub} size="sm" />
        </span>
          </div>
  </div>
  )
}

export default Footer