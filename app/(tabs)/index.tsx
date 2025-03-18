import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import className from 'twrnc';
import SearchInput from '@/components/SearchInput';
import PlayAndShuffle from '@/components/PlayAndShuffle';
import Tracks from '@/components/Tracks';
import { SoundProvider } from '@/context/SoundContext';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

const Index = () => {
  useEffect(() => {
    // Demander la permission pour les notifications
    const requestNotificationPermission = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Permission pour les notifications non accordée');
      }
    };

    requestNotificationPermission();

    // Configuration du canal de notification pour Android
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('music-channel', {
        name: 'Music Controls',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    // Écouter les actions de notification
    const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
      const action = response.notification.request.content.data.action;

      if (action === 'play') {
        console.log('Play action');
        // Code pour jouer la musique
      } else if (action === 'pause') {
        console.log('Pause action');
        // Code pour mettre en pause la musique
      } else if (action === 'next') {
        console.log('Next action');
        // Code pour passer à la piste suivante
      } else if (action === 'previous') {
        console.log('Previous action');
        // Code pour revenir à la piste précédente
      }
    });

    return () => subscription.remove(); // Nettoyer l'écouteur
  }, []);

  return (
    <SoundProvider>
      <View style={className`flex-1 bg-black gap-5`}>
        <SearchInput />
        <PlayAndShuffle />
        <Tracks />
      </View>
    </SoundProvider>
  );
};

export default Index;

