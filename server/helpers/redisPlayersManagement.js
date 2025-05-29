import redis from "../exports/redis.js";
import { createPlayer } from "./glicko.js";
import { scalingFactor } from "./glicko.js";

const PLAYERS_KEY = "players:";

export async function checkPlayer(playerId) {

    // Check if the player already exists in Redis
    const playerKey = `${PLAYERS_KEY}${playerId}`;

    const playerExists = await redis.hgetall(playerKey);
    console.log("Player exists in redis: ", playerExists)
    if (playerExists) {
        const playerRating = playerExists.__rating * scalingFactor + parseInt(playerExists.defaultRating);
        const hydratedPlayer = createPlayer(playerRating, playerExists.__rd * scalingFactor, playerExists.__vol);
        hydratedPlayer.id = playerId;
        return hydratedPlayer;
    }
    // If the player does not exist, create a new player
    const newPlayer = createPlayer();
    console.log("Adding new player to redis " + await redis.hset(playerKey, newPlayer));
    newPlayer.id = playerId; // Assign the playerId to the new player
    return newPlayer;
}

export async function updatePlayer(playerId, playerData) {
    const playerKey = `${PLAYERS_KEY}${playerId}`;
    const updatedPlayer = await redis.hset(playerKey, playerData);
    console.log("Updated player in redis: ", updatedPlayer);
    return updatedPlayer;
}



