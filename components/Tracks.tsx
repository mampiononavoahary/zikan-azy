import React, { useState } from 'react';
import { View, ScrollView, FlatList } from 'react-native';
import Track from './Track';
import MusicScreen from './MusicScreen';
import { useSound } from '@/context/SoundContext';
import { unknownTrackImageUri } from '@/constants/images';

const Tracks = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const { play, removeTrack, tracks, isPlaying, currentTrack } = useSound(); // Récupérer isPlaying et currentTrack

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
                image={item.artwork ? { uri: item.artwork } : unknownTrackImageUri}
                title={item.title}
                name={item.artist}
                onDelete={() => removeTrack(item)} // Passer la fonction de suppression
                isPlaying={isPlaying && currentTrack?.url === item.url} // Passer l'état de lecture
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