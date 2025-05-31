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
      <div className="text-lg text-zinc-400 font-medium text-center mb-1">
        Rank: {user.rank ? user.rank : "Unranked"}
      </div>
      <div className="text-base text-zinc-400 font-medium text-center">
        ELO: {user.elo !== null ? user.elo : "-"}
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
      <span className="mt-[-16px] mb-2">Matches</span>
      <span className="mt-2 text-2xl font-bold">{matchesPlayed}</span>
    </Block>
    <Block
      whileHover={{ rotate: "-2.5deg", scale: 1.1 }}
      className="col-span-6 bg-zinc-800 md:col-span-3 flex flex-col items-start justify-center text-sm font-medium relative"
    >
      <span className="mt-[-16px] mb-2">Won</span>
      <span className="mt-2 text-2xl font-bold">{matchesWon}</span>
    </Block>
    <Block
      whileHover={{ rotate: "-2.5deg", scale: 1.1 }}
      className="col-span-6 bg-zinc-800 md:col-span-3 flex flex-col items-start justify-center text-sm font-medium relative"
    >
      <span className="mt-[-16px] mb-2">Lost</span>
      <span className="mt-2 text-2xl font-bold">{matchesLost}</span>
    </Block>
    <Block
      whileHover={{ rotate: "2.5deg", scale: 1.1 }}
      className="col-span-6 bg-zinc-800 md:col-span-3 flex flex-col items-start justify-center text-sm font-medium relative"
    >
      <span className="mt-[-16px] mb-2">Win Rate</span>
      <span className="mt-2 text-2xl font-bold">{winRate}%</span>
    </Block>
  </>
);
