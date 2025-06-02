import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/useAuth";

export const RevealBento = () => {
  const navigate = useNavigate();
  const { user, userStats, loading } = useAuth();



  const matchesLost = Math.max(userStats.matchesPlayed - userStats.matchesWon, 0);
  const winRate = userStats.matchesPlayed > 0
    ? ((userStats.matchesWon / userStats.matchesPlayed) * 100).toFixed(1)
    : "0.0";

  return (
    <div className="min-h-screen px-4 py-12 text-zinc-50">
      <motion.div
        initial="initial"
        animate="animate"
        transition={{ staggerChildren: 0.05 }}
        className="mx-auto grid max-w-4xl grid-flow-dense grid-cols-12 gap-4"
      >
        <HeaderBlock user={user} />
        <SocialsBlock
          matchesPlayed={userStats.matchesPlayed}
          matchesWon={userStats.matchesWon}
          matchesLost={matchesLost}
          winRate={winRate}
        />
      </motion.div>
      <div className="flex justify-center mt-8">
        <button
          className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:bg-purple-700 text-white border-0 shadow-none px-12 py-5 text-3xl font-semibold rounded-md"
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
      whileHover={{ scale: 1.03 }}
      className={`rounded-lg bg-[#181022] border border-fuchsia-700 text-white shadow-md p-6 ${className}`}
      {...rest}
    />
  );
};

const HeaderBlock = ({ user }) => {
  return (
    <Block className="col-span-12 row-span-2 md:col-span-6 flex flex-col items-center justify-center">
      <h1 className="mb-2 text-4xl font-bold text-center">
        {user.username}
      </h1>
      <div className="text-2xl text-yellow-300 font-medium text-center mb-1">
        Rank: #{user.rank ? user.rank : "Unranked"}
      </div>
      <div className="text-xl text-purple-600 font-medium text-center">
        Rating: {user.elo !== null ? Math.round(user.elo) : "-"}
      </div>
    </Block>
  );
};

const SocialsBlock = ({ matchesPlayed, matchesWon, matchesLost, winRate }) => (
  <>
    <Block
      whileHover={{ rotate: "2.5deg", scale: 1.1 }}
      className="col-span-6 bg-zinc-800 md:col-span-3 flex flex-col items-start justify-center text-sm font-medium relative"
    >
      <span className="mt-[-16px] mb-2 text-2xl">Matches</span>
      <span className="mt-2 text-2xl font-bold">{matchesPlayed}</span>
    </Block>
    <Block
      whileHover={{ rotate: "-2.5deg", scale: 1.1 }}
      className="col-span-6 bg-zinc-800 md:col-span-3 flex flex-col items-start justify-center text-sm font-medium relative"
    >
      <span className="mt-[-16px] mb-2 text-2xl">Won</span>
      <span className="mt-2 text-2xl font-bold">{matchesWon}</span>
    </Block>
    <Block
      whileHover={{ rotate: "-2.5deg", scale: 1.1 }}
      className="col-span-6 bg-zinc-800 md:col-span-3 flex flex-col items-start justify-center text-sm font-medium relative"
    >
      <span className="mt-[-16px] mb-2 text-2xl">Lost</span>
      <span className="mt-2 text-2xl font-bold">{matchesLost}</span>
    </Block>
    <Block
      whileHover={{ rotate: "2.5deg", scale: 1.1 }}
      className="col-span-6 bg-zinc-800 md:col-span-3 flex flex-col items-start justify-center text-sm font-medium relative"
    >
      <span className="mt-[-16px] mb-2 text-2xl">Win Rate</span>
      <span className="mt-2 text-2xl font-bold">{winRate}%</span>
    </Block>
  </>
);
