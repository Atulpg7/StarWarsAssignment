import PLAYERS from '../data/StarWarsPlayers.json';
import MATCHES from '../data/StarWarsMatches.json';

export const getSortedPlayers = () => {
  const playerStats = PLAYERS.reduce((acc, player) => {
    acc[player.id] = {...player, points: 0, totalScore: 0};
    return acc;
  }, {});

  MATCHES.forEach(({player1, player2}) => {
    playerStats[player1.id].totalScore += player1.score;
    playerStats[player2.id].totalScore += player2.score;

    if (player1.score > player2.score) {
      playerStats[player1.id].points += 3;
    } else if (player2.score > player1.score) {
      playerStats[player2.id].points += 3;
    } else {
      playerStats[player1.id].points += 1;
      playerStats[player2.id].points += 1;
    }
  });

  return Object.values(playerStats).sort((a, b) => {
    if (b.points === a.points) {
      return b.totalScore - a.totalScore;
    }
    return b.points - a.points;
  });
};

export const getPlayerName = id => {
  const player = PLAYERS.find(_ => _.id.toString() === id.toString());
  return player ? player.name : 'Unknown Player';
};
