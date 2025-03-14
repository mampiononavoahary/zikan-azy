import { View, Text, ScrollView, FlatList } from 'react-native'
import React, { useState } from 'react'
import data from '../assets/data/library.json'
import Track from './Track'
import className from 'twrnc'
import MusicScreen from './MusicScreen'

const Tracks = () => {
  const [popupVisible,setPopupVisible] = useState(false);
  const [MusicScreenHide,setMusicScreenHide] = useState(true);
  const toggleHide = ()=>{
    setPopupVisible(!popupVisible)

  }
  const togglePopup = ()=>{
    setPopupVisible(!popupVisible)
  }
  return (
    <>
    <View style={className`flex-1`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList data={data}
          renderItem={({ item }) => (
            <Track onpresse={togglePopup} image={item.artwork} title={item.title} name={item.artist}/>
          )}
        />
      </ScrollView>
    </View>
    {popupVisible && (<MusicScreen onpress={toggleHide}/>)}
</>
  )
}

export default Tracks
