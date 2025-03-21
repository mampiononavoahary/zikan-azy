import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import className from 'twrnc'

const SearchInput = () => {
  return (
    <View style={className`bg-gray-800 rounded-lg flex-row justify-start items-center px-3 gap-2 w-95`}>
      <MaterialIcons name='search' size={24} color='white'/>
      <TextInput placeholder='Find in songs' style=
        {className`text-lg flex-1 p-2 text-gray-300 rounded-lg`}/>
    </View>
  )
}

export default SearchInput
