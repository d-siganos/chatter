import React from 'react';
import { useChat } from '../contexts/chatContext';

import { HiOutlineMicrophone } from 'react-icons/hi';
import { ImAttachment } from 'react-icons/im';
import { IoImageOutline } from 'react-icons/io5';
import { RiSendPlane2Fill } from 'react-icons/ri';

const MessageInput = ({ sendMessage }: { sendMessage: any }) => {
  const { message, setMessage } = useChat();

  return (
    <div className="fixed inset-x-0 bottom-0 ml-16 pb-5 bg-gray-100 dark:bg-gray-800 transition duration-300">
      <div className="flex flex-row items-center px-6">
        <div className="flex flex-row items-center w-full border border-gray-400 rounded-3xl h-12 px-2">
          <button className="flex items-center justify-center h-10 w-10 text-gray-400 ml-1">
            <HiOutlineMicrophone className="w-5 h-5" />
          </button>
          <div className="w-full">
            <input type="text" className="border border-transparent bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-300 w-full focus:outline-none text-sm h-10 flex items-center transition duration-300"
              value={message} onChange={e => setMessage(e.target.value)} onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null} placeholder="Type your message" />
          </div>
          <div className="flex flex-row">
            <button className="flex items-center justify-center h-10 w-8 text-gray-400">
              <ImAttachment className="w-5 h-5" />
            </button>
            <button className="flex items-center justify-center h-10 w-8 text-gray-400 ml-1 mr-2">
              <IoImageOutline className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="ml-3">
          <button className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300 text-indigo-800 transition ease-in duration-100"
            onClick={sendMessage}>
            <RiSendPlane2Fill className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MessageInput;
