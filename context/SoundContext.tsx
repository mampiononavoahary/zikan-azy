import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { Audio } from 'expo-av';
import * as Notifications from 'expo-notifications';

interface Track {
  url: string;
  artwork: string;
  title: string;
  artist: string;
}

interface SoundContextType {
  isPlaying: boolean;
  currentTrack: Track | null;
  tracks: Track[]; // Exposer la liste des pistes
  play: (track: Track) => Promise<void>;
  pause: () => Promise<void>;
  togglePlayStop: () => Promise<void>;
  nextTrack: () => void;
  previousTrack: () => void;
  removeTrack: (track: Track) => void; // Nouvelle fonction pour supprimer une piste
}

const SoundContext = createContext<SoundContextType | null>(null);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(-1);
  const soundRef = useRef<Audio.Sound | null>(null);

  // Charger les pistes depuis le fichier JSON
  useEffect(() => {
    const loadTracks = async () => {
      const loadedTracks = require('../assets/data/library.json'); // Importez le fichier JSON
      setTracks(loadedTracks);
    };

    loadTracks();
  }, []);

  // Mettre à jour la notification avec les informations de la piste en cours
  const updateNotification = async (track: Track) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: track.title,
        body: track.artist,
        sound: false,
        data: { action: 'play' }, // Données supplémentaires pour gérer les actions
      },
      trigger: null, // Notification immédiate
    });
  };

  const play = async (track: Track) => {
    if (soundRef.current) {
      await soundRef.current.stopAsync();
      await soundRef.current.unloadAsync();
      soundRef.current = null;
    }

    try {
      const { sound: newSound } = await Audio.Sound.createAsync({ uri: track.url });
      soundRef.current = newSound;
      await newSound.playAsync();
      setIsPlaying(true);
      setCurrentTrack(track);
      setCurrentTrackIndex(tracks.findIndex((t) => t.url === track.url));

      // Mettre à jour la notification
      await updateNotification(track);
    } catch (error) {
      console.error("Erreur lors du chargement de la musique :", error);
    }
  };

  const pause = async () => {
    if (soundRef.current) {
      await soundRef.current.pauseAsync();
      setIsPlaying(false);
    }
  };

  const togglePlayStop = async () => {
    if (soundRef.current) {
      if (isPlaying) {
        await pause();
      } else {
        await soundRef.current.playAsync();
        setIsPlaying(true);
      }
    }
  };

  const nextTrack = () => {
    if (tracks.length === 0 || currentTrackIndex === -1) return;

    const nextIndex = (currentTrackIndex + 1) % tracks.length;
    const nextTrack = tracks[nextIndex];
    play(nextTrack);
  };

  const previousTrack = () => {
    if (tracks.length === 0 || currentTrackIndex === -1) return;

    const prevIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    const prevTrack = tracks[prevIndex];
    play(prevTrack);
  };

  // Fonction pour supprimer une piste
  const removeTrack = (track: Track) => {
    const updatedTracks = tracks.filter((t) => t.url !== track.url);
    setTracks(updatedTracks);

    // Si la piste supprimée est en cours de lecture, arrêter la lecture
    if (currentTrack && currentTrack.url === track.url) {
      if (soundRef.current) {
        soundRef.current.stopAsync();
        soundRef.current.unloadAsync();
        soundRef.current = null;
      }
      setCurrentTrack(null);
      setIsPlaying(false);
    }
  };

  // Écouter les actions de notification
  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
      const action = response.notification.request.content.data.action;

      if (action === 'play') {
        togglePlayStop();
      } else if (action === 'next') {
        nextTrack();
      } else if (action === 'previous') {
        previousTrack();
      }
    });

    return () => subscription.remove(); // Nettoyer l'écouteur
  }, [isPlaying, currentTrack]);

  // Nettoyer le son lors du démontage du composant
  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  return (
    <SoundContext.Provider
      value={{
        isPlaying,
        currentTrack,
        tracks, // Exposer la liste des pistes
        play,
        pause,
        togglePlayStop,
        nextTrack,
        previousTrack,
        removeTrack, // Exposer la fonction de suppression
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSound doit être utilisé dans un SoundProvider");
  }
  return context;
};