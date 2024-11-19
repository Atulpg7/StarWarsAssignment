import React, {useEffect, useMemo, useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';
import MATCHES from '../data/StarWarsMatches.json';
import {getPlayerName} from '../helpers/utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  matchItem: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 32,
  },
  text: {
    fontSize: 16,
    flex: 1,
    color: 'black',
    fontWeight: 'bold',
  },
  heading: {
    padding: 12,
    fontSize: 24,
    fontWeight: 'bold',
  },
});

const getResultColor = (playerScore, opponentScore) => {
  if (playerScore > opponentScore) return 'green';
  if (playerScore < opponentScore) return 'red';
  return 'white';
};

const PlayerMatchesScreen = ({route}) => {
  const {params} = useRoute();
  const {playerId} = params;

  const playerMatches = useMemo(() => {
    return MATCHES.filter(
      ({player1, player2}) =>
        player1.id.toString() === playerId ||
        player2.id.toString() === playerId,
    )
      .map(match => {
        const isPlayer1 = match.player1.id.toString() === playerId;

        const player1Name = isPlayer1
          ? getPlayerName(match.player1.id)
          : getPlayerName(match.player2.id);

        const player2Name = isPlayer1
          ? getPlayerName(match.player2.id)
          : getPlayerName(match.player1.id);

        return {
          isPlayer1,
          player1Name,
          player2Name,
          player1Score: isPlayer1 ? match.player1.score : match.player2.score,
          player2Score: isPlayer1 ? match.player2.score : match.player1.score,
        };
      })
      .reverse();
  }, [playerId]);

  const renderItem = ({item}) => {
    const {isPlayer1, player1Name, player2Name, player1Score, player2Score} =
      item;

    const resultColor = getResultColor(player1Score, player2Score);

    return (
      <View style={[styles.matchItem, {backgroundColor: resultColor}]}>
        <Text style={styles.text}>{isPlayer1 ? player1Name : player2Name}</Text>
        <Text style={[styles.text, {textAlign: 'center'}]}>
          {isPlayer1 ? player1Score : player2Score} -{' '}
          {isPlayer1 ? player2Score : player1Score}
        </Text>
        <Text style={styles.text}>{isPlayer1 ? player2Name : player1Name}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Matches</Text>
      <FlatList
        data={playerMatches}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default PlayerMatchesScreen;
