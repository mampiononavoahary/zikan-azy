import { View, Text, Pressable } from 'react-native'
import React from 'react'
import className from 'twrnc'
import { Play,Shuffle } from 'lucide-react-native';

const PlayAndShuffle = () => {
  return (
    <View style={className`flex-row justify-between items-center`}>
      <Pressable style={className`flex-row justify-center gap items-cener gap-3 bg-gray-800 rounded-lg p-3 w-47`}>
        <Play size={25} color='white' />
        <Text style={className`text-lg font-bold text-white`}>
          Play
        </Text>
      </Pressable>

      <Pressable style={className`flex-row justify-center gap items-cener gap-3 bg-gray-800 rounded-lg p-3 w-47`}>
        <Shuffle size={25} color='white' />
        <Text style={className`text-lg font-bold text-white`}>
         Shuffle 
        </Text>
      </Pressable>
    </View >
  )
}

export default PlayAndShuffle
