import React from 'react'
import LottieView from 'lottie-react-native'
import { TouchableOpacity, View, Text } from 'react-native'
import { colors } from '../../styles/colors'

interface PropsCategoria {
  titulo: string,
  onPress?: any
}

export default function CardNotFound({ titulo, onPress }: PropsCategoria) {

  return (
    <TouchableOpacity
      onPress={onPress ? onPress : () => { }}
      activeOpacity={onPress ? 0.7 : 1}
      style={{ width: '100%', alignItems: 'center', paddingVertical: 8 }}
    >
      <LottieView style={{ width: 180, height: 180 }} source={require('../../animations/not-found.json')} autoPlay loop />
      <View style={{ width: '100%', paddingHorizontal: 20, marginTop: 8 }}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: '500',
            color: colors.dark,
            textAlign: 'center',
            lineHeight: 30,
          }}
        >
          {titulo}
        </Text>
      </View>
    </TouchableOpacity>

  )
}



