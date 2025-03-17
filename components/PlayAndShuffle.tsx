import { View, Text, Pressable } from 'react-native'
import React from 'react'
import className from 'twrnc'
import { MaterialIcons } from '@expo/vector-icons';

const PlayAndShuffle = () => {
  return (
    <View style={className`flex-row justify-between items-center`}>
      <Pressable style={className`flex-row justify-center gap items-center gap-3 bg-gray-800 rounded-lg p-3 w-47`}>
        <MaterialIcons name="play-arrow" size={25} color='white' />
        <Text style={className`text-lg font-bold text-white`}>
          Play
        </Text>
      </Pressable>

      <Pressable style={className`flex-row justify-center gap items-center gap-3 bg-gray-800 rounded-lg p-3 w-47`}>
        <MaterialIcons name="shuffle" size={25} color='white' />
        <Text style={className`text-lg font-bold text-white`}>
         Shuffle 
        </Text>
      </Pressable>
    </View >
  )
}

export default PlayAndShuffle
