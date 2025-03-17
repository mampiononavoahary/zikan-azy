import { View, Text, Image } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import className from 'twrnc'
import data from '../../assets/data/library.json'

const playlists = () => {
  return (
    <View style={className`flex-1 bg-black gap-3`}>
      <View style={className`flex-row justify-between items-center gap-3`}>

      <Image source={data[0].artwork} style={className`h-20 w-20 rounded-xl`}/>
      <Text style={className`flex-1 text-lg font-bold text-white`}>{data[0].playlist}</Text>
      <MaterialIcons name="fast-forward" size={15} color='white'/>
      </View>
    </View>
  )
}

export default playlists
