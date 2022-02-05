import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import axios from 'axios';
import { useParams } from 'react-router';
import { useAuth } from '../contexts/authContext';
import { useChat } from '../contexts/chatContext';
import useDarkMode from '../hooks/useDarkMode';
import { encrypt } from '../crypto';
import { Sidebar, RoomCreation, Messages, MessageInput, SkeletonMessages } from '.';

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
  const { room = '' }: { room: string } = useParams();
  const { currentUser } = useAuth();
  const { ENDPOINT, message, setMessage, setMessages, showModal } = useChat();
  const [loading, setLoading] = useState<boolean>(false);
  const socket = useRef<Socket | null>(null);

  let user = useRef<object>({});

  let encryptionKey: string = '';

  useEffect(() => {
    if (!room) return;

    socket.current = io(ENDPOINT, { transports: ['websocket'], secure: true, upgrade: false });

    setLoading(true);

    const getPreviousMessages = async (key: string) => {
      encryptionKey = key;
      const res = await axios.get(`${ENDPOINT}/room/${room}/messages`);

      setMessages(res.data);
      setLoading(false);
    }

    const postUser = async () => {
      const res = await axios.post(`${ENDPOINT}/users/`, {
        username: currentUser?.email,
        nickname: currentUser?.email?.replace(/@[^@]+$/, ''),
        avatarLink: currentUser?.photoURL
      });

      user.current = res.data.user;

      socket.current?.emit('join', { user: user.current, room }, getPreviousMessages);
    }
    
    postUser();
    
    socket.current?.on('message', messageData => {
      setMessages((oldMessages: Array<any>) => [...oldMessages, messageData]);
    });

    return () => {
      socket.current?.off('message');
      socket.current?.disconnect();
    };
  }, [ENDPOINT, room]);

  const sendMessage = async (event: React.KeyboardEvent<HTMLInputElement> | null) => {
    event?.preventDefault();

    if (message && !loading) {
      const messageData = {
        room,
        user: user.current,
        message: encrypt(message, encryptionKey),
        date: new Date().getTime(),
      };

      await socket.current?.emit('sendMessage', { room, messageData });
      setMessage('');
    }
  };

  return (
    <>
      {showModal ? <RoomCreation /> : null}
      <div className="h-screen w-full overflow-hidden flex">
        <Sidebar user={user} currentRoom={room} loading={loading} />
        <div className="w-full h-full overflow-auto bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 transition duration-300">  
          <div className="fixed inset-x-0 top-0 flex items-center justify-evenly ml-16 py-3 bg-gray-100 dark:bg-gray-800 bg-opacity-90 shadow-lg">
            <span className="text-gray-800 dark:text-gray-200 text-lg font-semibold pl-6">{room}</span>
            <ThemeIcon />
          </div>
          {!room
            ? <div className="w-full h-full flex items-center justify-center">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-center">Welcome</h1>
                  <h2 className="text-xl sm:text-2xl font-normal text-center">Join a room, or create your own</h2>
                </div>
              </div>
            : null
          }
          {loading
            ? <SkeletonMessages />
            : <Messages user={user.current} encryptionKey={encryptionKey} />
          }
          {room ? <MessageInput sendMessage={sendMessage} /> : null}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
