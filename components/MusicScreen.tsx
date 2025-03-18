import React from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import className from 'twrnc';
import { MaterialIcons } from '@expo/vector-icons';
import { useSound } from '@/context/SoundContext';
import { unknownTrackImageUri } from '@/constants/images';
import { PlayerProgressBar } from './PlayerProgressBar';

interface MusicScreenProps {
  onpress: () => void;
}

const MusicScreen: React.FC<MusicScreenProps> = ({ onpress }) => {
  const { isPlaying, currentTrack, togglePlayStop, nextTrack, previousTrack } = useSound();

  if (!currentTrack) {
    return (
      <View style={className`absolute bg-black top-0 left-0 right-0 bottom-0 flex items-center justify-center`}>
        <Text style={className`text-white`}>Aucune musique sélectionnée</Text>
        <Pressable onPress={onpress} style={className`mt-5 p-3 bg-red-500 rounded`}>
          <Text style={className`text-white`}>Fermer</Text>
        </Pressable>
      </View>
    );
  }

  // Créez un objet `trackForPlayer` compatible avec l'interface `Track`
  const trackForPlayer = {
    title: currentTrack.name,
    artist: currentTrack.artist || "Artiste inconnu",
    url: currentTrack.path, // Assurez-vous que cette propriété existe
  };
  return (
    <View
      style={className`absolute bg-green-500 top-0 left-0 right-0 bottom-0 rounded-xl p-5 flex-col justify-center items-center gap-5`}
    >
      <View style={className`p-1 w-15 rounded-full bg-gray-500`} />
      <Pressable onPress={onpress}>
        <Image source={currentTrack.artwork ? { uri: currentTrack.artwork } : unknownTrackImageUri} style={className`h-85 w-85 rounded-xl`} />
      </Pressable>
      <View style={className`flex-row justify-between items-center w-80`}>
        <View>
          <Text style={className`text-lg text-white font-bold`}>{currentTrack.name}</Text>
          <Text style={className`text-lg text-white`}>{currentTrack.artist || "Artiste inconnu"}</Text>
        </View>
        <MaterialIcons size={25} name="favorite" color="white" />
      </View>
      <View style={className`p-5 flex-row justify-center items-center gap-6`}>
        <Pressable onPress={previousTrack}>
          <MaterialIcons size={25} name="skip-previous" color="white" fill="white" />
        </Pressable>
        <Pressable onPress={togglePlayStop}>
          {isPlaying ? <MaterialIcons size={25} name="pause" color="white" fill="white" /> : <MaterialIcons size={25} name="play-arrow" color="white" fill="white" />}
        </Pressable>
        <Pressable onPress={nextTrack}>
          <MaterialIcons size={25} name="skip-next" color="white" fill="white" />
        </Pressable>
      </View>
    </View>
  );
};

export default MusicScreen;
