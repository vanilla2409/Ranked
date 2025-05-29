import glicko from "../exports/glicko.js";
import { updateLeaderboard } from "./leaderboard.js";
import { updatePlayer } from "./redisPlayersManagement.js";

// taken from glicko2. Will use it to calculate the rating, rd, vol
export const scalingFactor = 173.7178;

export function createPlayer(rating, rd, vol){
  if (rating && rd && vol) {
    const player = glicko.makePlayer(rating, rd, vol);
    glicko.removePlayers(); 
    return player;
  }
  const player = glicko.makePlayer();
  glicko.removePlayers();
  return player;
}

export async function updateMatchResults(player1, player2, result){

    const p1_prev_rating = player1.getRating();
    const p2_prev_rating = player2.getRating();

    const hydratedPlayer1 = glicko.makePlayer(p1_prev_rating, player1.getRd(), player1.getVol());
    hydratedPlayer1.id = player1.id; 

    const hydratedPlayer2 = glicko.makePlayer(p2_prev_rating, player2.getRd(), player2.getVol());
    hydratedPlayer2.id = player2.id;

    const matches = [];
    matches.push([hydratedPlayer1, hydratedPlayer2, result]);
    glicko.updateRatings(matches);

    // update ratings in leaderboard 
    await updateLeaderboard(player1.id, hydratedPlayer1.getRating());
    await updateLeaderboard(player2.id, hydratedPlayer2.getRating());

    // update ratings in players: set [redis]
    await updatePlayer(player1.id, hydratedPlayer1);
    await updatePlayer(player2.id, hydratedPlayer2);

    const ratingDifference = {
        winner: hydratedPlayer1.getRating() - p1_prev_rating,
        loser: hydratedPlayer2.getRating() - p2_prev_rating,
    };

    glicko.removePlayers(); // just to clear the players from glicko's memory (as we are using redis, we dont need extra mem to store players)
    
    return ratingDifference;
}


