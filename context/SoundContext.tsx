import React, { createContext, useContext, useState, useEffect } from "react";
import { Audio } from "expo-av";
import useLocalMusic from "@/components/getMusic";

interface AudioFile {
  name: string;
  path: string;
  artist: string;
  artwork: string | null;
}

interface SoundContextType {
  tracks: AudioFile[];
  currentTrack: AudioFile | null;
  isPlaying: boolean;
  playTrack: (track?: AudioFile) => Promise<void>;
  pauseTrack: () => Promise<void>;
  stopTrack: () => Promise<void>;
  togglePlayStop: () => Promise<void>;
  nextTrack: () => void;
  previousTrack: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const tracks = useLocalMusic();
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [currentTrack, setCurrentTrack] = useState<AudioFile | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState<number>(0);
  const [position, setPosition] = useState(0);  // Position de la lecture

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const playTrack = async (track?: AudioFile) => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }

      let selectedTrack = track || tracks[trackIndex];

      if (!selectedTrack) {
        console.warn("Aucune piste à lire !");
        return;
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: selectedTrack.path },
        { shouldPlay: true }
      );

      setSound(newSound);
      setCurrentTrack(selectedTrack);
      setIsPlaying(true);

      newSound.setOnPlaybackStatusUpdate(async (status) => {
        if (!status.isLoaded) return;
        if (status.didJustFinish) {
          nextTrack(); // Passer automatiquement à la piste suivante
        } else {
          setPosition(status.positionMillis);  // Mettre à jour la position pendant la lecture
        }
      });
    } catch (error) {
      console.error("Erreur lors de la lecture du son :", error);
    }
  };

  const pauseTrack = async () => {
    if (sound) {
      const status = await sound.getStatusAsync();
      setPosition(status.positionMillis);  // Sauvegarder la position actuelle
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  };

  const stopTrack = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
      setCurrentTrack(null);
      setPosition(0);  // Réinitialiser la position
    }
  };

  const togglePlayStop = async () => {
    if (isPlaying) {
      await pauseTrack();  // Mettre en pause si la lecture est en cours
    } else {
      if (sound) {
        await sound.playFromPositionAsync(position);  // Reprendre à la position où on a arrêté
      } else {
        await playTrack();  // Si aucun son n'est en lecture, commencer une nouvelle lecture
      }
      setIsPlaying(true);
    }
  };

  const nextTrack = () => {
    if (tracks.length === 0) return;

    let newIndex = (trackIndex + 1) % tracks.length;
    setTrackIndex(newIndex);
    playTrack(tracks[newIndex]);
  };

  const previousTrack = () => {
    if (tracks.length === 0) return;

    let newIndex = trackIndex - 1 < 0 ? tracks.length - 1 : trackIndex - 1;
    setTrackIndex(newIndex);
    playTrack(tracks[newIndex]);
  };

  if (tracks === null) {
    return <Text>Permission refusée. Impossible de charger la musique.</Text>;
  }

  return (
    <SoundContext.Provider
      value={{
        tracks,
        currentTrack,
        isPlaying,
        playTrack,
        pauseTrack,
        stopTrack,
        togglePlayStop,
        nextTrack,
        previousTrack,
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
