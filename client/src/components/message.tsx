import React from 'react';

const Message = ({ lastMessages, name }: { lastMessages: any, name: string | null | undefined }) => {
  const message = lastMessages[0];
  const previousMessage = lastMessages[1];

  let hideAvatar = message?.user === previousMessage?.user;

  let date = new Date();
  const dateString = date.toLocaleDateString();
  date.setTime(message?.date);

  const dateToShow = date.toLocaleDateString() === dateString ? `${("00" + date.getHours()).slice(-2)}:${("00" + date.getMinutes()).slice(-2)}` : date.toLocaleDateString();

  return (
    <div>
      <div className={`w-full flex ${message?.user === name ? "flex-row-reverse" : ""} ${hideAvatar ? "mt-1" : "mt-3"}`}>
        <img className={`h-12 w-12 ${hideAvatar ? "invisible" : ""}`} src={`https://avatars.dicebear.com/api/gridy/${message?.user}.svg`} alt={message?.user} />
        <div className={`px-4 pb-4 pt-2 max-w-xl text-gray-300 ${message?.user === name ? "bg-purple-700 mr-3 rounded-l-3xl rounded-br-3xl" : "bg-gray-700 ml-3 rounded-r-3xl rounded-bl-3xl"}`}>
          <span className="text-xs block">{message?.user}</span>
          <span className="text-sm pr-1 break-words">{message?.message}</span>
          <span className="text-xs text-gray-400">{dateToShow}</span>
        </div>
      </div>
    </div>
  );
}

export default Message;
