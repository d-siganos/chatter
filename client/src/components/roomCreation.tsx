import React, { useRef } from 'react';
import { useAuth } from '../contexts/authContext';
import { useChat } from '../contexts/chatContext';
import { useHistory } from 'react-router-dom';
import { IoIosCloseCircleOutline } from 'react-icons/io';

const RoomCreation = () => {
  const history = useHistory();
  const { currentUser } = useAuth();
  const { setShowModal } = useChat();

  const roomRef = useRef<HTMLInputElement>(null);

  const createRoom = () => {
    let roomName = roomRef.current?.value;
    setShowModal(false);
    history.push(`/app/${roomName}`);
  };

  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative md:w-1/3 w-screen mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col md:h-auto h-screen bg-white outline-none focus:outline-none p-8">
            <IoIosCloseCircleOutline className="text-gray-400 hover:text-gray-600 absolute top-0 right-0 m-4 cursor-pointer transition duration-200"
              size="32" onClick={() => setShowModal(false)} />
            <h2 className="text-gray-900 text-2xl sm:text-3xl text-center font-bold">Create a room</h2>
            <p className="text-gray-800 text-base sm:text-lg text-center font-thin mb-4">Your own private chatroom</p>
            <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Room name</label>
            <input
              className="w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
              ref={roomRef} type="text" placeholder="Enter a room name" defaultValue={`${currentUser?.email}'s room`} />
            <div className="flex flex-row-reverse pt-4">
              <button
                onClick={createRoom}
                className="w-1/3 flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600 hover:bg-gradient-to-l hover:from-blue-500 
                hover:to-indigo-600 text-gray-100 p-4 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500">
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
}

export default RoomCreation;
