import glicko from "../exports/glicko.js";

export function createPlayer() {
  const player = glicko.makePlayer();
  glicko.removePlayers();
  return player;
}

export function updateMatchResults(player1, player2, result){
    const updated_p1 = glicko.makePlayer(player1.rating, player1.rd, player1.vol);
    console.log("Updated player 1: ", updated_p1)
    const updated_p2 = glicko.makePlayer(player2.rating, player2.rd, player2.vol);
    console.log("Updated player 2: ", updated_p2)
    const matches = [];
    matches.push([updated_p1, updated_p2, result]);
    glicko.updateRatings(matches);

    const updatedPlayers = {
        player1: {
            id: player1.id,
            rating: updated_p1.getRating(),
            rd: updated_p1.getRd(),
            vol: updated_p1.getVol(),
        },
        player2: {
            id: player2.id,
            rating: updated_p2.getRating(),
            rd: updated_p2.getRd(),
            vol: updated_p2.getVol(),
        },
    };

    glicko.removePlayers();
    
    return updatedPlayers;
}


