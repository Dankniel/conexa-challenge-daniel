import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp, NavigatorScreenParams } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NewsData } from '../features/home/components/NewsCard/types';

export type AuthStackParamList = {
  Login: undefined;
};

// Nuevo: Stack navigation para el Home
export type HomeStackParamList = {
  HomeMain: undefined;
  Favorites: undefined;
  NewsDetail: { news: NewsData };
};

export type MainTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Users: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
};

export type LoginScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<AuthStackParamList, 'Login'>,
  StackNavigationProp<RootStackParamList>
>;

export type HomeScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParamList, 'HomeMain'>,
  CompositeNavigationProp<
    BottomTabNavigationProp<MainTabParamList, 'Home'>,
    StackNavigationProp<RootStackParamList>
  >
>;

export type FavoritesScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParamList, 'Favorites'>,
  CompositeNavigationProp<
    BottomTabNavigationProp<MainTabParamList, 'Home'>,
    StackNavigationProp<RootStackParamList>
  >
>;

export type NewsDetailScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParamList, 'NewsDetail'>,
  CompositeNavigationProp<
    BottomTabNavigationProp<MainTabParamList, 'Home'>,
    StackNavigationProp<RootStackParamList>
  >
>; 