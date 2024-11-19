import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import PlayersLandingScreen from './src/screens/PlayersLandingScreen';
import PlayerMatchesScreen from './src/screens/PlayerMatchesScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="PlayersLandingScreen"
        screenOptions={{
          headerShown: true,
        }}>
        <Stack.Screen
          name="PlayersLandingScreen"
          component={PlayersLandingScreen}
          options={{
            headerTitle: 'Star Wars Blaster Tournament',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="PlayerMatchesScreen"
          component={PlayerMatchesScreen}
          options={({route}) => ({
            animation: 'slide_from_right',
            animationDuration: 0,
            // @ts-ignore
            headerTitle: `${route.params?.playerName}`,
            headerTitleAlign: 'center',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
