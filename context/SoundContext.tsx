// SoundContext.tsx
import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { Audio } from 'expo-av';

interface SoundContextType {
  isPlaying: boolean;
  currentTrack: { url: string; artwork: string; title: string; artist: string } | null;
  play: (track: { url: string; artwork: string; title: string; artist: string }) => Promise<void>;
  pause: () => Promise<void>;
  togglePlayStop: () => Promise<void>;
}

const SoundContext = createContext<SoundContextType | null>(null);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<{ url: string; artwork: string; title: string; artist: string } | null>(null);
  const soundRef = useRef<Audio.Sound | null>(null);

  const play = async (track: { url: string; artwork: string; title: string; artist: string }) => {
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

  // Nettoyage lors du démontage du composant
  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  return (
    <SoundContext.Provider value={{ isPlaying, currentTrack, play, pause, togglePlayStop }}>
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