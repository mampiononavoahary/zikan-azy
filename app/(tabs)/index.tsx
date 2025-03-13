import { View, Text } from 'react-native'
import React from 'react'
import className from 'twrnc'
import SearchInput from '@/components/SearchInput'

const index = () => {
  return (
    <View style={className`flex-1 bg-black`}>
      <SearchInput />
    </View>
  )
}

export default index
