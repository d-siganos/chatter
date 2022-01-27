import React from 'react';
import { Link } from 'react-router-dom';
import { MdPrivacyTip } from 'react-icons/md';
import { RiOpenSourceFill } from 'react-icons/ri';
import { BsPhoneFill } from 'react-icons/bs';
import chatterScreenshot from './../assets/chatter_screenshot.png';

const Home = () => {
  return (
    <div>
      <div className="bg-gradient-to-r from-indigo-500 to-blue-600 relative">
        <div className="container mx-auto relative px-4 pt-24 z-10 flex flex-col sm:flex-row items-center">
          <div className="lg:w-3/5 xl:w-2/5 flex flex-col items-start relative z-10">
            <h1 className="text-white text-5xl sm:text-7xl font-medium pb-6 text-center">Encrypted chatting made easy</h1>
            <h3 className="text-gray-100 text-xl sm:text-2xl font-light pb-16 text-center">Exchange messages with your peers untroubled</h3>
            <Link to="/app" className="w-1/2 mx-auto flex justify-center bg-white text-gray-800 hover:text-blue-600 p-4 rounded-full tracking-wide font-semibold shadow-lg hover:shadow-xl cursor-pointer transition ease-in duration-200">
                    Open Chatter
            </Link>
          </div>
          <div className="hidden md:flex lg:w-2/5 xl:w-3/5 flex-col items-center relative z-10">
            <img src={chatterScreenshot} alt="Screenshot" className="shadow-xl" />
          </div>
        </div>
        <div className="transform rotate-180 bottom-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="width-100 h-48" style={{ transform: "rotateY(180deg)" }}>
            <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="fill-current text-white"></path>
          </svg>
        </div>
      </div>
      <div className="bg-gray-100 w-3/4 mx-auto rounded-2xl p-8 mb-16">
        <h3 className="text-gray-800 text-xl sm:text-2xl font-extralight pb-12 text-center">Why choose us?</h3>
        <div className="p-4 gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <div className="bg-white rounded-xl p-4">
            <MdPrivacyTip className="text-indigo-500 text-4xl sm:text-6xl mx-auto" />
            <h2 className="text-indigo-500 text-2xl sm:text-3xl font-bold pb-8 text-center">Privacy</h2>
            <p className="text-center">We do not track personal data of any form. We only keep the necessary information about you; your e-mail address and your messages in encrypted form.</p>
          </div>
          <div className="bg-white rounded-xl p-4">
            <RiOpenSourceFill className="text-blue-500 text-4xl sm:text-6xl mx-auto" />
            <h2 className="text-blue-500 text-2xl sm:text-3xl font-bold pb-8 text-center">Open-source</h2>
            <p className="text-center">The code for this app is published on GitHub, granting transparency and allowing other developers to contribute.</p>
          </div>
          <div className="bg-white rounded-xl p-4">
            <BsPhoneFill className="text-blue-600 text-4xl sm:text-6xl mx-auto" />
            <h2 className="text-blue-600 text-2xl sm:text-3xl font-bold pb-8 text-center">Accessible</h2>
            <p className="text-center">Although Chatter is designed for PC users, the interface is completely mobile-friendly and can be accessed easily on any device.</p>
          </div>
        </div>
      </div>
      <p className="text-center text-sm font-thin">Created by <a className="text-blue-600" href="https://bonfirescratch.github.io/">Bonfire</a></p>
    </div>
  );
}

export default Home;
