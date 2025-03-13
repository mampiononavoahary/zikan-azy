import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import className from 'twrnc'
import { Ellipsis } from 'lucide-react-native';

const Track = () => {
  return (
    <View style={className`flex-row gap-3 justify-between items-center mb-2`}>
      <Image source={require('../assets/unknown_track.png')} style={className`h-12 w-12 border border-gray-300 rounded-lg`} />
      <Pressable style={className`flex-1 pb-3`}>
        <Text style={className`text-white text-lg`}>
          Djala Djala
        </Text>
        <Text style={className`text-white`}>
          Salala
        </Text>
      </Pressable>
      <Ellipsis size={25} color='white' />
    </View >
  )
}

export default Track
