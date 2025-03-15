import React, { useState } from 'react';
import { View, ScrollView, FlatList } from 'react-native';
import Track from './Track';
import data from '../assets/data/library.json'; // Importez le fichier JSON
import MusicScreen from './MusicScreen';
import { useSound } from '@/context/SoundContext';

const Tracks = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const { play, removeTrack, tracks } = useSound(); // Récupérer removeTrack et tracks

  const togglePopup = (item) => {
    setPopupVisible(!popupVisible);
    play(item); // Jouer la musique sélectionnée
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            data={tracks} // Utiliser la liste des pistes du contexte
            keyExtractor={(item) => item.url}
            renderItem={({ item }) => (
              <Track
                onpresse={() => togglePopup(item)}
                image={{ uri: item.artwork }}
                title={item.title}
                name={item.artist}
                onDelete={() => removeTrack(item)} // Passer la fonction de suppression
              />
            )}
          />
        </ScrollView>
      </View>
      {popupVisible && <MusicScreen onpress={() => setPopupVisible(false)} />}
    </>
  );
};

export default Tracks;