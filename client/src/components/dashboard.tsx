import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '../contexts/authContext';
import { Sidebar, Messages, MessageInput } from '.';
import useDarkMode from '../hooks/useDarkMode';

import { FaMoon, FaSun } from 'react-icons/fa';

const ThemeIcon = () => {
  const [darkTheme, setDarkTheme] = useDarkMode();
  const handleMode = () => setDarkTheme(!darkTheme);

  return (
    <span onClick={handleMode}>
      {darkTheme ? (
        <FaSun size='24' className="text-gray-500 mr-3 ml-4 transition duration-300 ease-in-out hover:text-pink-400 cursor-pointer" />
      ) : (
        <FaMoon size='24' className="text-gray-500 mr-3 ml-4 transition duration-300 ease-in-out hover:text-pink-400 cursor-pointer" />
      )}
    </span>
  );
};

const Dashboard = () => {
  const ENDPOINT:string = process.env.REACT_APP_SERVER_ENDPOINT || "http://localhost:8080/";

  const { signout, currentUser } = useAuth();
  const [name, setName] = useState<string | null | undefined>('');
  const [room, setRoom] = useState<string | null | undefined>('');
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<any>([]);
  const history = useHistory();
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    socket.current = io(ENDPOINT, { transports: ['websocket'], upgrade: false });

    let name_ = currentUser?.email;
    let room_ = 'chat';

    setName(name_);
    setRoom(room_);
    
    socket.current?.emit('join', { username: name_, room: room_ });

    socket.current?.on('message', messageData => {
      setMessages((oldMessages: Array<any>) => [...oldMessages, messageData]);
    });

    return () => {
      socket.current?.off('message');
      socket.current?.disconnect();
    };
  }, [ENDPOINT]);

  const logout = () => {
    signout();
    history.push("/");
  }

  const sendMessage = async (event: React.KeyboardEvent<HTMLInputElement> | null) => {
    event?.preventDefault();

    if (message) {
      const messageData = {
        room: room,
        user: name,
        message: message,
        date: new Date().getTime(),
      };

      await socket.current?.emit('sendMessage', messageData);
      setMessage('');
    }
  };

  return (
    <div className="h-screen w-full overflow-hidden flex">
      <Sidebar logout={logout} />
      <div className="w-full h-full overflow-auto bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 transition duration-300">  
        <div className="fixed inset-x-0 top-0 flex items-center justify-evenly ml-16 py-3 bg-gray-100 dark:bg-gray-800 bg-opacity-90 shadow-lg">
          <span className="text-gray-800 dark:text-gray-200 text-lg font-semibold pl-6">{room}</span>
          <ThemeIcon />
        </div>
        <Messages messages={messages} name={name} />
        <MessageInput message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default Dashboard;
