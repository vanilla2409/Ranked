import React from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { FiArrowRight, FiMail, FiMapPin } from "react-icons/fi";

export const RevealBento = () => {
  return (
    <div className="min-h-screen bg-[#101010] px-4 py-12 text-zinc-50">
      <motion.div
        initial="initial"
        animate="animate"
        transition={{ staggerChildren: 0.05 }}
        className="mx-auto grid max-w-4xl grid-flow-dense grid-cols-12 gap-4"
      >
        <HeaderBlock />
        <SocialsBlock />
        <AboutBlock />
        <LocationBlock />
        <EmailListBlock />
      </motion.div>
      <Footer />
    </div>
  );
};

const Block = ({ className, ...rest }) => (
  <motion.div
    variants={{
      initial: { scale: 0.5, y: 50, opacity: 0 },
      animate: { scale: 1, y: 0, opacity: 1 },
    }}
    transition={{ type: "spring", mass: 3, stiffness: 400, damping: 50 }}
    className={twMerge(
      "col-span-4 rounded-lg border border-zinc-700 bg-zinc-800 p-6",
      className
    )}
    {...rest}
  />
);

const HeaderBlock = () => (
  <Block className="col-span-12 row-span-2 md:col-span-6">
    <img
      src="https://api.dicebear.com/8.x/lorelei-neutral/svg?seed=John"
      alt="avatar"
      className="mb-4 w-14 h-14 rounded-full"
    />
    <h1 className="mb-12 text-4xl font-medium leading-tight">
      Hi, I'm Binit{" "}
      <span className="text-zinc-400">
        I build{" "}
      </span>
    </h1>
    <a href="#" className="flex items-center gap-1 text-red-300 hover:underline">
      Contact me <FiArrowRight />
    </a>
  </Block>
);

const SocialsBlock = () => (
  <>
    <Block whileHover={{ rotate: 2.5, scale: 1.1 }} className="col-span-6 bg-[#27272A] md:col-span-3">
      <div className="h-full flex items-center content-start text-[#4F46E5] font-bold">
        Matches  
      </div>
    </Block>
    <Block whileHover={{ rotate: -2.5, scale: 1.1 }} className="col-span-6 bg-[#27272A] md:col-span-3">
      <div className="h-full flex items-center justify-center text-[#4F46E5] font-bold">
        Win Rate
      </div>
    </Block>
    <Block whileHover={{ rotate: -2.5, scale: 1.1 }} className="col-span-6 bg-[#27272A] md:col-span-3">
      <div className="h-full flex items-center justify-center text-[#4F46E5] font-bold">
        Wins
      </div>
    </Block>
    <Block whileHover={{ rotate: 2.5, scale: 1.1 }} className="col-span-6 bg-[#27272A] md:col-span-3">
      <div className="h-full flex items-center justify-center text-[#4F46E5] font-bold">
        Losses
      </div>
    </Block>
  </>
);

const AboutBlock = () => (
  <Block className="col-span-12 text-3xl leading-snug">
    <p>
      Leaderboard.{" "}
      <span className="text-zinc-400">
        
      </span>
    </p>
  </Block>
);

const LocationBlock = () => (
  <Block className="col-span-12 flex flex-col items-center gap-4 md:col-span-3">
    <FiMapPin className="text-3xl" />
    <p className="text-center text-lg text-[#4F46E5]">Rank</p>
  </Block>
);

const EmailListBlock = () => (
  <Block className="col-span-12 md:col-span-9">
    <p className="mb-3 text-lg">Recent Matches</p>
  </Block>
);

const Footer = () => (
  <footer className="col-span-12 mt-12 text-center text-zinc-400">
    <p>
      <a href="#" className="text-red-300 hover:underline">
        
      </a>
    </p>
  </footer>
);
