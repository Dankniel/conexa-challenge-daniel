import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeStackParamList } from './types';
import HomeScreenContainer from '../features/home/screens/HomeScreen/HomeScreenContainer';
import FavoritesScreenContainer from '../features/favorites/screens/FavoritesScreen/FavoritesScreenContainer';

const HomeStack = createStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator 
      screenOptions={{ 
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
        gestureEnabled: true,
      }}
    >
      <HomeStack.Screen 
        name="HomeMain" 
        component={HomeScreenContainer} 
      />
      <HomeStack.Screen 
        name="Favorites" 
        component={FavoritesScreenContainer}
        options={{
          gestureEnabled: true,
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
          transitionSpec: {
            open: {
              animation: 'timing',
              config: {
                duration: 250,
              },
            },
            close: {
              animation: 'timing',
              config: {
                duration: 200,
              },
            },
          },
        }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator; 