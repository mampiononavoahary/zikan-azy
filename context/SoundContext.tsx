// context/SoundContext.tsx
import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { Audio } from 'expo-av';

interface Track {
  url: string;
  artwork: string;
  title: string;
  artist: string;
}

interface SoundContextType {
  isPlaying: boolean;
  currentTrack: Track | null;
  play: (track: Track) => Promise<void>;
  pause: () => Promise<void>;
  togglePlayStop: () => Promise<void>;
  nextTrack: () => void;
  previousTrack: () => void;
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

  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  return (
    <SoundContext.Provider value={{ isPlaying, currentTrack, play, pause, togglePlayStop, nextTrack, previousTrack }}>
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