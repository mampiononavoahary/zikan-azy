import React, { useEffect, useState } from "react";
import { Text, View, ViewProps } from "react-native";
import { Slider } from "react-native-awesome-slider";
import { useSharedValue } from "react-native-reanimated";
import { formateSecondToMinutes } from "@/helpers/secondtominutes";
import { Audio } from "expo-av";
import tw from "twrnc";

interface Track {
  title: string;
  artist: string;
  url: string; // URL ou chemin du fichier audio
}

interface PlayerProgressBarProps extends ViewProps {
  track: Track;
  isPlaying: boolean; // Ajoutez une prop pour gérer l'état de lecture
  onPlayPause: () => void; // Ajoutez une prop pour gérer la pause/reprise
}

export const PlayerProgressBar = ({ style, track, isPlaying, onPlayPause }: PlayerProgressBarProps) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const isSliding = useSharedValue(false);
  const progress = useSharedValue(0);
  const min = useSharedValue(0);
  const max = useSharedValue(1);

  // Charger la piste audio
  useEffect(() => {
    const loadAudio = async () => {
      try {
        if (sound) {
          await sound.unloadAsync(); // Décharger la piste précédente
        }

        // Charger la nouvelle piste audio
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: track.url } // Utiliser l'URL de la piste sélectionnée
        );
        setSound(newSound);

        // Écouter les mises à jour de position
        newSound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded) {
            setPosition(status.positionMillis);
            setDuration(status.durationMillis || 0);
            progress.value = status.positionMillis / (status.durationMillis || 1);
          }
        });

        // Jouer la piste audio
        if (isPlaying) {
          await newSound.playAsync();
        }
      } catch (error) {
        console.error("Erreur lors du chargement de la piste audio :", error);
      }
    };

    loadAudio();

    // Nettoyer à la fin
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [track]); // Recharger la piste lorsque `track` change

  // Gérer la pause/reprise
  useEffect(() => {
    const handlePlayPause = async () => {
      if (sound) {
        if (isPlaying) {
          await sound.playAsync();
        } else {
          await sound.pauseAsync();
        }
      }
    };

    handlePlayPause();
  }, [isPlaying]);

  // Formater les temps
  const trackElapsedTime = formateSecondToMinutes(position / 1000); // Convertir en secondes
  const trackRemainingTime = formateSecondToMinutes((duration - position) / 1000); // Convertir en secondes

  return (
    <View style={style}>
      <Slider
        progress={progress}
        minimumValue={min}
        maximumValue={max}
        style={tw`h-7 br-16`}
        thumbWidth={0}
        renderBubble={() => null}
        theme={{
          minimumTrackTintColor: "#4CAF50", // Remplacez par votre couleur
          maximumTrackTintColor: "#BDBDBD", // Remplacez par votre couleur
        }}
        onSlidingStart={() => {
          isSliding.value = true;
        }}
        onValueChange={async (value) => {
          if (sound) {
            await sound.setPositionAsync(value * duration);
          }
        }}
        onSlidingComplete={async (value) => {
          if (isSliding.value) return;
          isSliding.value = false;

          if (sound) {
            await sound.setPositionAsync(duration * value);
          }
        }}
      />

      <View style={tw`flex-row justify-between mt-2`}>
        <Text>{trackElapsedTime}</Text>
        <Text>-{trackRemainingTime}</Text>
      </View>
    </View>
  );
};
