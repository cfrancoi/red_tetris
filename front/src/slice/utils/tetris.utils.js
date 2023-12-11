
export function getPlayer(players, id) {
    return players.find(p => p.id === id);
}