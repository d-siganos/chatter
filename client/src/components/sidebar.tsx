import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { useChat } from '../contexts/chatContext';
import { BiExit } from 'react-icons/bi';
import { BsPlus } from 'react-icons/bs';

const SidebarIcon = ({ icon }: { icon: React.ReactNode }) => (
  <div className="relative flex items-center justify-center h-12 w-12 my-2 rounded-full mx-auto bg-gray-300 hover:bg-green-600 dark:bg-gray-800 text-green-500 hover:text-white hover:rounded-2xl transition-all duration-300 ease-linear cursor-pointer shadow-lg">
    {icon}
  </div>
);

const RoomIcon = ({ room, currentRoom }: { room: any, currentRoom: string }) => {
  const handleRightClick = (event: React.MouseEvent<any>) => {
    event.preventDefault();

    // TODO: Display custom menu
    console.log(event.clientX, event.clientY);
  }

  return (
    <Link to={`/app/${room?._id}`} onContextMenu={handleRightClick} className="mx-auto my-2 h-12 w-12">
      <img
        className={`${room?.name === currentRoom ? "rounded-2xl" : "rounded-full"} hover:rounded-2xl transition-all duration-300 ease-linear cursor-pointer shadow-lg`}
        src={room?.avatarLink} />
    </Link>
  )
}

const Sidebar = ({ user, currentRoom, loading }: { user: any, currentRoom: string, loading: boolean }) => {
  const history = useHistory();
  const { signout } = useAuth();
  const { ENDPOINT, setShowModal } = useChat();
  const [rooms, setRooms] = useState<Array<any>>([]);

  useEffect(() => {
    const getRooms = async (userId: string | null | undefined) => {
      const res = await axios.get(`${ENDPOINT}/users/${userId}/rooms`);
      setRooms(res.data);
    }

    getRooms(user?.uid);
  }, [loading]);

  const logOut = async () => {
    await signout();
    history.push("/");
  }

  return (
    <div className="h-screen w-16 flex flex-col bg-white dark:bg-gray-900 shadow-lg transition duration-300">
      <SidebarIcon icon={<BiExit size="22" onClick={() => logOut()} />} />
      {rooms.map((room, i) => (
        <RoomIcon key={i} room={room} currentRoom={currentRoom} />
      ))}
      <SidebarIcon icon={<BsPlus size="32" onClick={() => setShowModal(true)} />} />
    </div>
  );
}

export default Sidebar;
