import glicko from "../exports/glicko.js";
import { updateLeaderboard } from "./leaderboard.js";
import { updatePlayer } from "./redisPlayersManagement.js";

export function createPlayer() {
  const player = glicko.makePlayer();
  glicko.removePlayers();
  return player;
}

export async function updateMatchResults(player1, player2, result){
    const updated_p1 = glicko.makePlayer(player1.rating, player1.rd, player1.vol);
    console.log("Updated player 1: ", updated_p1)
    const updated_p2 = glicko.makePlayer(player2.rating, player2.rd, player2.vol);
    console.log("Updated player 2: ", updated_p2)
    const p1_prev_rating = updated_p1.getRating();
    const p2_prev_rating = updated_p2.getRating();

    const matches = [];
    matches.push([updated_p1, updated_p2, result]);
    glicko.updateRatings(matches);

    // update ratings in leaderboard 
    await updateLeaderboard(player1.id, updated_p1.getRating());
    await updateLeaderboard(player2.id, updated_p2.getRating());

    // update ratings in players: set [redis]
    await updatePlayer(player1.id, updated_p1);
    await updatePlayer(player2.id, updated_p2);

    const ratingDifference = {
        winner: updated_p1.getRating() - p1_prev_rating,
        loser: updated_p2.getRating() - p2_prev_rating,
    };

    glicko.removePlayers(); // just to clear the players from glicko's memory (as we are using redis, we dont need extra mem to store players)
    
    return ratingDifference;
}


