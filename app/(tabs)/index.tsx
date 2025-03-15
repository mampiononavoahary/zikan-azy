import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import className from 'twrnc';
import SearchInput from '@/components/SearchInput';
import PlayAndShuffle from '@/components/PlayAndShuffle';
import Tracks from '@/components/Tracks';
import { SoundProvider } from '@/context/SoundContext';
import * as Notifications from 'expo-notifications';

// Configurer les notifications pour afficher les contrôles de lecture
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

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

    // Écouter les actions de notification
    const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
      const action = response.notification.request.content.data.action;

      if (action === 'play') {
        console.log('Play action');
        // Jouer la musique
      } else if (action === 'pause') {
        console.log('Pause action');
        // Mettre en pause la musique
      } else if (action === 'next') {
        console.log('Next action');
        // Passer à la piste suivante
      } else if (action === 'previous') {
        console.log('Previous action');
        // Revenir à la piste précédente
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
