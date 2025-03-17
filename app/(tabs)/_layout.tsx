import { View, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Heart, Music, ListMusic, Users } from 'lucide-react-native';
import className from 'twrnc';

const Layout = () => {
  return (
    <View style={{flex:1, backgroundColor:'black'}}>
      <Tabs
        screenOptions={{
          headerStyle: {
            backgroundColor: 'rgba(0,0,0,1)',
            borderWidth: 0,
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontSize: 40,
            fontFamily:'Raleway',
            color: 'white',
          },
          tabBarStyle: {
            backgroundColor: 'rgba(55,55,255,0.5)',
            height: 70,
            padding: 10,
            margin: 10,
            borderWidth: 0,
            borderRadius: 20,
          },
          tabBarLabelStyle: {
            color: 'white',
          },
          tabBarInactiveTintColor: 'white',
        }}
      >
        <Tabs.Screen
          name="favorites"
          options={{
            tabBarIcon: () => <MaterialIcons name="favorite" size={25} color="white" />,
            headerTitle: 'Favorites',
            tabBarLabel: 'Favorites',
          }}
        />
        <Tabs.Screen
          name="playlists"
          options={{
            tabBarIcon: () => <MaterialIcons name="music-note" size={25} color="white" />,
            headerTitle: 'Playlists',
            tabBarLabel: 'Playlists',
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: () => <MaterialIcons name="queue-music" size={25} color="white" />,
            headerTitle: 'Songs',
            tabBarLabel: 'Songs',
          }}
        />
        <Tabs.Screen
          name="artists"
          options={{
            tabBarIcon: () => <MaterialIcons name="people" size={25} color="white" />,
            headerTitle: 'Artists',
            tabBarLabel: 'Artists',
          }}
        />
      </Tabs>
    </View>
  );
};

export default Layout;
