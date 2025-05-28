import React from "react";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { TrendingUp, User, Crown } from "lucide-react";

const Leaderboard = () => {
  return (
    <section className="py-20 bg-[#101010] min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Real-time{" "}
            <span className="bg-gradient-to-r from-fuchsia-500 to-purple-500 bg-clip-text text-transparent">
              Leaderboard
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            See who's dominating the arena right now
          </p>
        </div>

        <div className="text-center m-6">
          <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            Live Updates
          </Badge>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="bg-gray-900/50 border-gray-800 overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-fuchsia-600/10 to-purple-600/10 border-b border-gray-800 p-4">
                <div className="flex items-center justify-between text-sm font-medium text-gray-300">
                  <span>Rank</span>
                  <span>Player</span>
                  <span>Rating</span>
                </div>
              </div>

              <div className="divide-y divide-gray-800">
                {[
                  { rank: 1, username: "CodeMaster_X", rating: 2847, isTop: true },
                  { rank: 2, username: "AlgoNinja", rating: 2756, isTop: true },
                  { rank: 3, username: "ByteWarrior", rating: 2689, isTop: true },
                  { rank: 4, username: "DataStructGod", rating: 2634, isTop: false },
                  { rank: 5, username: "RecursiveQueen", rating: 2598, isTop: false },
                ].map((player) => (
                  <div
                    key={player.rank}
                    className={`flex items-center justify-between p-4 hover:bg-gray-800/50 transition-colors ${
                      player.isTop ? "bg-gradient-to-r from-fuchsia-600/5 to-purple-600/5" : ""
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          player.rank === 1
                            ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-black"
                            : player.rank === 2
                              ? "bg-gradient-to-r from-gray-400 to-gray-500 text-black"
                              : player.rank === 3
                                ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white"
                                : "bg-gray-700 text-gray-300"
                        }`}
                      >
                        {player.rank}
                      </div>
                    </div>

                    {/* Align avatar and name to the center under Player heading */}
                    <div className="flex flex-col items-center flex-1 min-w-0">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-medium text-white text-center truncate">{player.username}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className={`font-bold text-lg ${player.isTop ? "text-fuchsia-400" : "text-gray-300"}`}>
                        {player.rating.toLocaleString()}
                      </span>
                      {player.rank <= 3 && (
                        <Crown
                          className={`w-4 h-4 ${
                            player.rank === 1
                              ? "text-yellow-500"
                              : player.rank === 2
                                ? "text-gray-400"
                                : "text-amber-600"
                          }`}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-800/30 p-4 text-center">
                <Button variant="ghost" className="text-fuchsia-400 hover:text-fuchsia-300 hover:bg-fuchsia-500/10">
                  View Full Leaderboard
                  <TrendingUp className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;
