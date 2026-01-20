import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../../../styles/colors'

interface PropsMenuItem {
  titulo: string,
  icon: any,
  onPress: any,
}

export default function MenuItem({ titulo, icon, onPress }: PropsMenuItem) {
  // Verifica se é um componente React (SVG) ou uma imagem
  // Componentes React são funções, imagens são objetos com require()
  const isReactComponent = typeof icon === 'function' || React.isValidElement(icon)
  
  return (
    <TouchableOpacity onPress={onPress} className='pl-4 py-4 pr-6 flex-row gap-2 items-center'>
      {isReactComponent ? (
        <View style={{ width: 24, height: 24, justifyContent: 'center', alignItems: 'center' }}>
          {typeof icon === 'function' ? React.createElement(icon) : icon}
        </View>
      ) : (
        <Image source={icon} />
      )}
      <Text
        className='text-base font-medium leading-6'
        style={{ color: colors.primary20 }}
      >{titulo}</Text>
    </TouchableOpacity>
  )
}
