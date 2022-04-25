import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { decrypt } from '../crypto';
import ScrollToBottomDiv from './scrollToBottom';

import { AiOutlineDownload } from 'react-icons/ai';

const Message = ({ lastMessages, messageId, user, encryptionKey }: { lastMessages: any, messageId: string, user: any, encryptionKey: string }) => {
  const message = lastMessages[0];
  const previousMessage = lastMessages[1];

  let hideAvatar = message?.user.username === previousMessage?.user.username;
  let isFromMe = message?.user.username === user.username;
  let isHighlighted = messageId === message?._id;

  let date = new Date();
  const dateString = date.toLocaleDateString();
  date.setTime(message?.date);

  const dateToShow = date.toLocaleDateString() === dateString ? `${("00" + date.getHours()).slice(-2)}:${("00" + date.getMinutes()).slice(-2)}` : date.toLocaleDateString();

  return (
    <>
      { isHighlighted  ? <ScrollToBottomDiv /> : null }
      <div id={message?._id} className={`w-full flex ${message?.user.username === user.username ? "flex-row-reverse" : ""} ${hideAvatar ? "mt-1" : "mt-3"}`}>
        <img className={`h-12 w-12 ${hideAvatar ? "invisible" : ""}`} src={message?.user.avatarLink} alt={message?.user.nickname} referrerPolicy="no-referrer"></img>
        <div className={`px-4 pb-4 pt-2 max-w-xl text-gray-300 ${isHighlighted ? "highlightedMessage" : (isFromMe? "bg-purple-700" : "bg-gray-700")} ${isFromMe ? "rightMessage" : "leftMessage"}`}>
          <span className="text-xs block">{message?.user.nickname}</span>
          {message?.type === "text" || message?.type === "default"
            ? <ReactMarkdown remarkPlugins={[[remarkGfm, {singleTilde: false}]]}
                components={{
                  h1: ({node, ...props}) => <p className="text-2xl font-semibold" {...props} />,
                  h2: ({node, ...props}) => <p className="text-xl font-medium" {...props} />,
                  h3: ({node, ...props}) => <p className="text-lg" {...props} />,
                  a: ({node, ...props}) => <a className="underline text-sky-500" {...props} />
                }}
                className="text-sm pr-1 inline-block break-words">
                {message?.type === 'text' ? decrypt(message?.message, encryptionKey) : message?.message}
              </ReactMarkdown>
            : null
          }
          {message?.type === 'image' ? <img src={message?.message} className="p-2 object-contain max-w-64 max-h-64" alt="Attachment" /> : null}
          {message?.type === 'attachment'
            ? <>
                <a href={message?.message} download>
                  <AiOutlineDownload  className="inline mr-2" size="32" />
                  <p className="text-sm inline mr-1">Download attachment</p>
                </a>
              </>
            : null}
          <span className="text-xs text-gray-400">{dateToShow}</span>
        </div>
      </div>
    </>
  );
}

export default Message;
