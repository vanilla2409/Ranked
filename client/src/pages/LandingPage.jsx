import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Users, Target, Sword, Crown,TrendingUp, User } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#101010] text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-[#101010]/95 backdrop-blur supports-[backdrop-filter]:bg-[#101010]/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-4xl font-bold bg-gradient-to-r from-fuchsia-500 to-purple-500 bg-clip-text text-transparent">
              Ranked
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800">
              Login
            </Button>
            <Button className="bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-700 hover:to-purple-700 text-white border-0">
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20 hover:bg-fuchsia-500/20 p-4 text-xl">
            Live 1v1 Battles
          </Badge>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Compete. Win. Get{" "}
            <span className="bg-gradient-to-r from-fuchsia-500 to-purple-500 bg-clip-text text-transparent">
              Ranked
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Face off against developers worldwide in real-time DSA challenges. Climb the ranks, prove your skills, and
            become the ultimate coding champion.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              size="lg"
              className="bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-700 hover:to-purple-700 text-white border-0 text-lg px-8 py-6 h-auto font-semibold shadow-lg shadow-fuchsia-500/25 hover:shadow-fuchsia-500/40 transition-all duration-300"
            >
              Enter Battle Arena
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-fuchsia-400 mb-2">10K+</div>
              <div className="text-gray-400">Active Battlers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">50K+</div>
              <div className="text-gray-400">Battles Fought</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-fuchsia-400 mb-2">24/7</div>
              <div className="text-gray-400">Live Matches</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-gray-900/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-fuchsia-500 to-purple-500 bg-clip-text text-transparent">
                Ranked?
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The ultimate platform for competitive programming and skill development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-gray-900/50 border-gray-800 hover:border-fuchsia-500/50 transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Real-time Battles</h3>
                <p className="text-gray-400">
                  Face opponents in live 1v1 coding challenges with instant feedback and results.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Rating System</h3>
                <p className="text-gray-400">
                  Climb the leaderboards with our ELO-based rating system and track your progress.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800 hover:border-fuchsia-500/50 transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Global Community</h3>
                <p className="text-gray-400">Connect with developers worldwide and learn from the best in the field.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Real-time{" "}
              <span className="bg-gradient-to-r from-fuchsia-500 to-purple-500 bg-clip-text text-transparent">
                Leaderboard
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">See who's dominating the arena right now</p>
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

                      <div className="flex items-center space-x-3 flex-1 justify-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-medium text-white">{player.username}</span>
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


      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-fuchsia-900/20 to-purple-900/20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Crown className="w-16 h-16 text-fuchsia-400 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Prove Your Worth?</h2>
            <p className="text-xl text-gray-400 mb-8">
              Do you have what it takes to rise through the ranks and become a coding champion?
            </p>
            <Button
              size="lg"
              className=" bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-700 hover:to-purple-700 text-white border-0 text-lg md:text-2xl px-12 py-6 h-auto font-semibold shadow-lg shadow-fuchsia-500/25 hover:shadow-fuchsia-500/40 transition-all duration-300"
            >
              Start Your Battle Journey
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 bg-[#101010]">
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Ranked. All rights reserved.</p>
          </div>
      </footer>
    </div>
  )
}

