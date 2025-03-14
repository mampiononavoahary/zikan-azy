import React from 'react';
import { View, Text, Image, Pressable, ImageSourcePropType } from 'react-native';
import className from 'twrnc';
import { Ellipsis,Trash2 } from 'lucide-react-native';

interface TrackProps {
  image: ImageSourcePropType;
  title: string;
  name: string;
  onpresse: () => void;
  onDelete?: () => void;
}
const Track: React.FC<TrackProps> = ({ image, title, name, onpresse,onDelete }) => {
  return (
    <View style={className`flex-row gap-3 justify-between items-center mb-2`}>
      <Image source={image} style={className`h-12 w-12 border border-gray-300 rounded-lg`} />
      <Pressable onPress={onpresse} style={className`flex-1 pb-3`}>
        <Text style={className`text-white text-lg`}>{title}</Text>
        <Text style={className`text-white`}>{name}</Text>
      </Pressable>
      <Ellipsis size={25} color='white' />
      {onDelete && (
        <Pressable onPress={onDelete} style={className`p-2`}>
          <Trash2 color="red" size={20} />
        </Pressable>
      )}
    </View>
  );
};

export default Track;
