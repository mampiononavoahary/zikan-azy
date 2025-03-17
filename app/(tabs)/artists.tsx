import { View, Text, ScrollView, FlatList, Image } from 'react-native'
import React from 'react'
import className from 'twrnc'
import data from '../../assets/data/library.json'
import SearchInput from '@/components/SearchInput'

const artists = () => {
  return (
    <View style={className`flex-1 bg-black gap-3 items-center`}>
      <SearchInput />
      <ScrollView>
        <View>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <View
                style={className`flex-row gap-3 py-2 mb-2 justify-start items-center w-90`}
              >
                <Image
                  source={item.artwork}
                  style={className`h-15 w-15 
                  rounded-full`}
                />
                <Text style={className`text-lg text-white`}>{item.artist}</Text>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default artists
