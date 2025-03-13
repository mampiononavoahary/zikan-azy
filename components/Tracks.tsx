import { View, Text, ScrollView, FlatList } from 'react-native'
import React from 'react'
import data from '../assets/data/library.json'
import Track from './Track'
import className from 'twrnc'

const Tracks = () => {
  return (
    <View style={className`flex-1`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList data={data}
          renderItem={({ item }) => (
            <Track image={item.artwork} title={item.title} name={item.artist}/>
          )}
        />
      </ScrollView>
    </View>
  )
}

export default Tracks
