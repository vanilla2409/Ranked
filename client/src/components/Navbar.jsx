import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const SlideTabsExample = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#101010] py-4">
      <SlideTabs navigate={navigate} />
    </div>
  );
};

const SlideTabs = ({ navigate }) => {
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 });

  return (
    <ul
      onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
      className="relative mx-auto flex w-fit rounded-full border-2 border-black bg-white p-1"
    >
      <Tab setPosition={setPosition} onClick={() => navigate("/")}>
        Landing
      </Tab>
      <Tab setPosition={setPosition} onClick={() => navigate("/dashboard")}>
        Dashboard
      </Tab>
      <Tab setPosition={setPosition} onClick={() => navigate("/resources")}>
        Resources
      </Tab>
      <Tab setPosition={setPosition} onClick={() => navigate("/rivals")}>
        Rivals
      </Tab>

      <Cursor position={position} />
    </ul>
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
      className="relative z-10 cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-base"
    >
      {children}
    </li>
  );
};

const Cursor = ({ position }) => (
  <motion.li
    animate={position}
    className="absolute z-0 h-7 rounded-full bg-black md:h-12"
  />
);
