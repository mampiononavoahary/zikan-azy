import React, { useEffect } from 'react';
import { View, Text, Image, Pressable, ImageSourcePropType } from 'react-native';
import className from 'twrnc';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing, cancelAnimation } from 'react-native-reanimated';

interface TrackProps {
  image: ImageSourcePropType;
  title: string;
  name: string;
  onpresse: () => void;
  onDelete?: () => void;
  isPlaying?: boolean; // Ajouter une prop pour indiquer si la musique est en cours de lecture
}

const Track: React.FC<TrackProps> = ({ image, title, name, onpresse, onDelete, isPlaying }) => {
  const rotation = useSharedValue(0);

  // Définir l'animation de rotation
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  // Démarrer ou arrêter l'animation en fonction de l'état de lecture
  useEffect(() => {
    if (isPlaying) {
      rotation.value = withRepeat(
        withTiming(360, { duration: 2000, easing: Easing.linear }),
        -1 // Répéter indéfiniment
      );
    } else {
      // Arrêter l'animation
      cancelAnimation(rotation);
      rotation.value = 0; // Réinitialiser la rotation
    }
  }, [isPlaying]);

  return (
    <View style={className`flex-row gap-3 justify-between items-center mb-2`}>
      <Image source={image} style={className`h-12 w-12 border border-gray-300 rounded-lg`} />
      <Pressable onPress={onpresse} style={className`flex-1 pb-3`}>
        {isPlaying ? <Text style={className`text-green-500 text-lg`}>{title}</Text>:<Text style={className`text-white text-lg`}>{title}</Text>}
        {isPlaying ? <Text style={className`text-green-200`}>{name}</Text>:<Text style={className`text-white`}>{name}</Text>}
      </Pressable>
      <Animated.View style={animatedStyle}>
        <MaterialCommunityIcons name="dots-vertical" size={25} color="white" />
      </Animated.View>
      {onDelete && (
        <Pressable onPress={onDelete} style={className`p-2`}>
          <FontAwesome name="trash" color="red" size={20} />
        </Pressable>
      )}
    </View>
  );
};

export default Track;
