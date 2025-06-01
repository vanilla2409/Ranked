import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import { showSuccess } from "./ui/sonner";
import { useAuth } from "../lib/useAuth";
import { LogoutButton } from "./LogoutButton";

export const SlideTabsExample = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#101010] py-4 relative">
      <SlideTabs navigate={navigate} />
      <div className="absolute" style={{ right: '30px', top: '50%', transform: 'translateY(-50%)' }}>
        <LogoutButton className="bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-700 hover:to-purple-700 text-white !text-white hover:!text-white focus:!text-white border-0 font-semibold px-6 py-2 rounded-md shadow-lg shadow-fuchsia-500/25 hover:shadow-fuchsia-500/40 transition-all duration-300" />
      </div>
    </div>
  );
};

const SlideTabs = ({ navigate }) => {
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 });

  return (
    <div className="flex items-center justify-center w-full max-w-[2000px] mx-auto relative">
      <ul
        onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
        className="relative flex justify-center items-center flex-1 rounded-full border-2 border-fuchsia-700 bg-[#101010] p-1"
      >
        <Tab setPosition={setPosition} onClick={() => navigate("/dashboard")}>
          Dashboard
        </Tab>
        <Tab setPosition={setPosition} onClick={() => navigate("/resources")}>
          Learn
        </Tab>
        <Tab setPosition={setPosition} onClick={() => navigate("/leaderboard")}>
          Leaderboard
        </Tab>
        <Cursor position={position} />
      </ul>
    </div>
  );
};

const Tab = ({ children, setPosition, onClick }) => {
  const ref = useRef(null);
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      onClick={onClick}
      className="relative z-10 cursor-pointer px-3 py-1.5 text-xs uppercase text-white md:px-5 md:py-3 md:text-base"
    >
      {children}
    </li>
  );
};

const Cursor = ({ position }) => (
  <motion.li
    animate={position}
    className="absolute z-0 h-7 rounded-full bg-gradient-to-r from-fuchsia-600 to-purple-600 md:h-12"
  />
);