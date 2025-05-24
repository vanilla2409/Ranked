import redis from "../exports/redis.js";
import { createPlayer, updateMatchResults } from "./glicko.js";


const PLAYERS_KEY = "players:";

export async function checkPlayer(playerId) {

    // Check if the player already exists in Redis
    const playerKey = `${PLAYERS_KEY}${playerId}`;

    const playerExists = await redis.hgetall(playerKey);
    console.log("Player exists in redis: ", playerExists)
    if (playerExists.id) {
        return playerExists;
    }
    // If the player does not exist, create a new player
    const newPlayer = createPlayer();
    newPlayer.id = playerId;

    console.log("Adding new player to redis " + await redis.hset(playerKey, newPlayer));

    return newPlayer;
}




