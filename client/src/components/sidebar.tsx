import React from 'react';
import { IconType } from 'react-icons';
import { BiExit } from 'react-icons/bi';
import { BsGearFill } from 'react-icons/bs';

const SidebarIcon = ({ icon }: { icon: React.ReactNode }) => {
  return (
    <div className="relative flex items-center justify-center h-12 w-12 mt-2 mb-2 mx-auto bg-gray-300 hover:bg-green-600 dark:bg-gray-800 text-green-500 hover:text-white hover:rounded-xl rounded-3xl transition-all duration-300 ease-linear cursor-pointer shadow-lg">
      {icon}
    </div>
  );
}

const Sidebar = ({ logout }: { logout: any }) => {
  return (
    <div className="h-screen w-16 flex flex-col bg-white dark:bg-gray-900 shadow-lg transition duration-300">
      <SidebarIcon icon={<BiExit size="22" onClick={logout} />} />
    </div>
  );
}

export default Sidebar;
