// Tracks.tsx
import React, { useState } from 'react';
import { View, ScrollView, FlatList } from 'react-native';
import Track from './Track';
import className from 'twrnc';
import data from '../assets/data/library.json';
import MusicScreen from './MusicScreen';
import { useSound } from '../context/SoundContext';

const Tracks: React.FC = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [selected, setSelected] = useState<{ url: string; artwork: string; title: string; artist: string } | null>(null);
  const { play } = useSound();

  const togglePopup = (item: { url: string; artwork: string; title: string; artist: string }) => {
    setPopupVisible(!popupVisible);
    setSelected(item);
    play(item); // Jouer la musique sélectionnée
  };

  return (
    <>
      <View style={className`flex-1`}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.url}
            renderItem={({ item }) => (
              <Track
                onpresse={() => togglePopup(item)}
                image={{ uri: item.artwork }}
                title={item.title}
                name={item.artist}
              />
            )}
          />
        </ScrollView>
      </View>
      {popupVisible && selected && (
        <MusicScreen onpress={() => setPopupVisible(false)} track={selected} />
      )}
    </>
  );
};

export default Tracks;
