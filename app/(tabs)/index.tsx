import { View, Text } from 'react-native';
import React from 'react';
import className from 'twrnc';
import SearchInput from '@/components/SearchInput';
import PlayAndShuffle from '@/components/PlayAndShuffle';
import Tracks from '@/components/Tracks';
import { SoundProvider } from '@/context/SoundContext';

const Index = () => {
  return (
    <SoundProvider>
      <View style={className`flex-1 bg-black gap-5`}>
        <SearchInput />
        <PlayAndShuffle />
        <Tracks />
      </View>
    </SoundProvider>
  );
};

export default Index;
