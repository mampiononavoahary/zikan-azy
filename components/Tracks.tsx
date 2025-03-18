import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import Track from './Track';
import MusicScreen from './MusicScreen';
import { useSound } from '@/context/SoundContext';
import { unknownTrackImageUri } from '@/constants/images';

const Tracks = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const { playTrack, tracks, isPlaying, currentTrack } = useSound(); 

  const togglePopup = (item) => {
    setPopupVisible(!popupVisible);
    playTrack(item);
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        {/* Suppression de ScrollView et FlatList gère le scroll */}
        <FlatList
          data={tracks}
          keyExtractor={(item) => item.path}
          renderItem={({ item }) => (
            <Track
              onpresse={() => togglePopup(item)}
              image={item.artwork ? { uri: item.artwork } : unknownTrackImageUri}
              title={item.name}  
              name={item.artist}  
              onDelete={() => removeTrack(item)}
              isPlaying={isPlaying && currentTrack?.path === item.path}
            />
          )}
        />
      </View>
      {popupVisible && <MusicScreen onpress={() => setPopupVisible(false)} />}
    </>
  );
};

export default Tracks;

