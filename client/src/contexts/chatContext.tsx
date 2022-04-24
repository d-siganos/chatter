import React, { createContext, useContext, useState } from 'react';

type ChatContent = {
  ENDPOINT: string,
  room: string,
  setRoom: React.Dispatch<React.SetStateAction<string>>,
  message: string,
  setMessage: React.Dispatch<React.SetStateAction<string>>,
  messages: any,
  setMessages: React.Dispatch<React.SetStateAction<any[]>>,
  images: any,
  setImages: React.Dispatch<React.SetStateAction<any[]>>,
  showModal: Boolean,
  setShowModal: React.Dispatch<React.SetStateAction<Boolean>>,
};

const ChatContext = createContext({} as ChatContent);

export const useChat = () => {
  return useContext(ChatContext);
}

export const ChatProvider: React.FC = ({ children }) => {
  const ENDPOINT:string = process.env.NODE_ENV === 'production' ? "https://chatter-js-app.herokuapp.com" : "http://localhost:8080";
  const [room, setRoom] = useState<string>('chat');
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Array<any>>([]);
  const [images, setImages] = useState<Array<any>>([]);
  const [showModal, setShowModal] = useState<Boolean>(false);

  const value = {
    ENDPOINT,
    room, setRoom,
    message, setMessage,
    messages, setMessages,
    images, setImages,
    showModal, setShowModal,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};
