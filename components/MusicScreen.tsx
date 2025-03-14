import { View,Image, Text, Pressable } from 'react-native'
import React from 'react'
import className from 'twrnc'
import { LucideHeart,SkipForward,SkipBack,Play } from 'lucide-react-native';
import data from '../assets/data/library.json'

const MusicScreen = ({onpress}) => {
  return (
    <View
      style={className`absolute bg-green-500 
    top-0 left-0 right-0 bottom-0 rounded-xl p-5 flex-col justify-center 
    items-center gap-5`}
    >
      <View style={className`p-1 w-15 rounded-full bg-gray-500`}></View>
      <Pressable onPress={onpress}>
        <Image
          source={data[3].artwork}
          style={className`h-85 w-85 rounded-xl`}
        />
      </Pressable>
      <View style={className`flex-row justify-between items-center w-80`}>
        <View>
          <Text style={className`text-lg text-white font-bold`}>
            Mbarakaly ee, Salama bee
          </Text>
          <Text style={className`text-lg text-white`}>Théo Rakotovao</Text>
        </View>
        <LucideHeart color="red" fill="red" />
      </View>
      <View style={className`p-5 flex-row justify-center items-center gap-6`}>
        <SkipBack color="white" fill="white" />
        <Play color="white" fill="white" />
        <SkipForward color="white" fill="white" />
      </View>
    </View>
  );
}

export default MusicScreen
