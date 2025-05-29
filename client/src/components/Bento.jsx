import React from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router-dom";

export const RevealBento = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen px-4 py-12 text-zinc-50">
      <motion.div
        initial="initial"
        animate="animate"
        transition={{
          staggerChildren: 0.05,
        }}
        className="mx-auto grid max-w-4xl grid-flow-dense grid-cols-12 gap-4"
      >
        <HeaderBlock />
        <SocialsBlock />
      </motion.div>
      <div className="flex justify-center mt-8">
        <button
          className="bg-[#A594F9] text-white hover:bg-[#b3a0e6] hover:text-white border-none shadow-none px-8 py-3 text-lg font-semibold rounded-md"
          onClick={() => navigate("/battle")}
        >
          Compete
        </button>
      </div>
    </div>
  );
};

const Block = ({ className, ...rest }) => {
  return (
    <motion.div
      variants={{
        initial: {
          scale: 0.5,
          y: 50,
          opacity: 0,
        },
        animate: {
          scale: 1,
          y: 0,
          opacity: 1,
        },
      }}
      transition={{
        type: "spring",
        mass: 3,
        stiffness: 400,
        damping: 50,
      }}
      className={twMerge(
        "col-span-4 rounded-lg border border-zinc-700 bg-zinc-800 p-6",
        className
      )}
      {...rest}
    />
  );
};

const HeaderBlock = () => (
  <Block className="col-span-12 row-span-2 md:col-span-6">
    <h1 className="mb-12 text-4xl font-medium leading-tight">
      Hi, I'm Tom.{" "}
      <span className="text-zinc-400">
        I build cool websites like this one.
      </span>
    </h1>
    <a
      href="#"
      className="flex items-center gap-1 text-red-300 hover:underline"
    >
    </a>
  </Block>
);

const SocialsBlock = () => (
  <>
    <Block
      whileHover={{
        rotate: "2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-zinc-800 md:col-span-3"
    />
    <Block
      whileHover={{
        rotate: "-2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-zinc-800 md:col-span-3"
    />
    <Block
      whileHover={{
        rotate: "-2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-zinc-800 md:col-span-3"
    />
    <Block
      whileHover={{
        rotate: "2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-zinc-800 md:col-span-3"
    />
  </>
);



