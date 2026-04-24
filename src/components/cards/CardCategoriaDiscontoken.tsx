import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import { colors } from '../../styles/colors'

interface PropsCardCategoriaDiscontoken {
  titulo: string
  onPress?: () => void
}

export default function CardCategoriaDiscontoken({
  titulo,
  onPress,
}: PropsCardCategoriaDiscontoken) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className='rounded-lg items-center justify-center px-2 ml-1 mr-2 h-9'
      style={{
        backgroundColor: colors.secondary50,
        borderWidth: 1,
        borderColor: colors.secondary70,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.35,
        shadowRadius: 2.05,
        elevation: 3,
      }}
    >
      <View className='flex-row items-center'>
        <Text style={{ color: '#FFFFFF', fontSize: 12, marginRight: 4 }}>★</Text>
        <Text
          className='text-xs font-medium py-1 px-1'
          style={{ color: '#FFFFFF' }}
        >
          {titulo}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
