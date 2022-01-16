import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { useChat } from '../contexts/chatContext';
import { BiExit } from 'react-icons/bi';
import { BsPlus } from 'react-icons/bs';

const SidebarIcon = ({ icon }: { icon: React.ReactNode }) => {
  return (
    <div className="relative flex items-center justify-center h-12 w-12 mt-2 mb-2 mx-auto bg-gray-300 hover:bg-green-600 dark:bg-gray-800 text-green-500 hover:text-white hover:rounded-xl rounded-3xl transition-all duration-300 ease-linear cursor-pointer shadow-lg">
      {icon}
    </div>
  );
}

const Sidebar = () => {
  const history = useHistory();
  const { signout } = useAuth();
  const { setShowModal } = useChat();

  const logOut = async () => {
    console.log("lah");
    await signout();
    history.push("/");
  }

  return (
    <div className="h-screen w-16 flex flex-col bg-white dark:bg-gray-900 shadow-lg transition duration-300">
      <SidebarIcon icon={<BiExit size="22" onClick={() => logOut()} />} />
      <SidebarIcon icon={<BsPlus size="32" onClick={() => setShowModal(true)} />} />
    </div>
  );
}

export default Sidebar;
