import glicko from "../exports/glicko.js";

function AddPlayer() {
  const player = glicko.makePlayer();
  return player;
}

function updateMatchResults(player1, player2, result){
    glicko.addResult(player1, player2, result);
    glicko.updateRatings();
}

function getAllPlayers() {
    return glicko.getPlayers();
}

