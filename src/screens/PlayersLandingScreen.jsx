import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Image, StyleSheet, Pressable} from 'react-native';
import {getSortedPlayers} from '../helpers/utils';
import {useNavigation} from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3d3d330',
    paddingTop: 24,
  },
  header: {
    paddingLeft: 12,
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 0.8,
    borderBottomColor: '#ccc',
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  name: {
    flex: 1,
    fontSize: 18,
  },
  score: {
    fontSize: 18,
    marginEnd: 24,
    fontWeight: 'bold',
  },
  contentContainerStyle: {backgroundColor: 'white'},
});

const PlayersLandingScreen = () => {
  const navigation = useNavigation();
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const sortedPlayers = getSortedPlayers();
    setPlayers(sortedPlayers);
  }, []);

  const handleOnPress = (playerId, playerName) => {
    navigation.navigate('PlayerMatchesScreen', {
      headerTitle: 'Star Wars Tournament',
      playerId,
      playerName,
    });
  };

  const renderItem = ({item}) => (
    <Pressable
      style={styles.listItem}
      onPress={() => handleOnPress(item.id.toString(), item.name)}>
      <Image source={{uri: item.icon}} style={styles.icon} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.score}>{item.points}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Points Table</Text>
      </View>
      <FlatList
        data={players}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </View>
  );
};

export default PlayersLandingScreen;
