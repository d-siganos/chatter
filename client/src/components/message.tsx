import React from 'react';

const Message = ({ data, name }: { data: any, name: string | null | undefined }) => {
  let date = new Date();
  const dateString = date.toLocaleDateString();
  date.setTime(data?.date);

  const dateToShow = date.toLocaleDateString() === dateString ? `${("00" + date.getHours()).slice(-2)}:${("00" + date.getMinutes()).slice(-2)}` : date.toLocaleDateString();

  return (
    <div>
      <div className={`w-full flex ${data?.user === name ? "flex-row-reverse" : ""} mb-5`}>
        <img className="h-12 w-12" src={`https://avatars.dicebear.com/api/gridy/${data?.user}.svg`} alt={data?.user} />
        <div className={`px-4 pb-4 pt-2 max-w-xl text-gray-300 ${data?.user === name ? "bg-purple-700 mr-3 rounded-l-3xl rounded-br-3xl" : "bg-gray-700 ml-3 rounded-r-3xl rounded-bl-3xl"}`}>
          <span className="text-xs block">{data?.user}</span>
          <span className="text-sm pr-1 break-words">{data?.message}</span>
          <span className="text-xs text-gray-400">{dateToShow}</span>
        </div>
      </div>
    </div>
  );
}

export default Message;
