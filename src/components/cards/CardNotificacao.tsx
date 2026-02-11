import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { colors } from '../../styles/colors'

export interface PropsCardNotificacao {
  id: number | string
  data: string
  hora: string
  titulo: string
  descricao?: string | null
  visualizado: boolean
  onPress: () => void
}

export default function CardNotificacao({
  data,
  hora,
  titulo,
  descricao,
  visualizado,
  onPress
}: PropsCardNotificacao) {
  const corFundo = visualizado ? colors.primary90 : colors.tertiary90
  const corBorda = visualizado ? colors.primary40 : colors.tertiary40
  const corIconeFundo = visualizado ? colors.primary80 : colors.tertiary80
  const corSeta = visualizado ? colors.primary20 : colors.tertiary40

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className='flex-row items-center rounded-2xl p-4 mb-3'
      style={{
        backgroundColor: corFundo,
        borderWidth: 1,
        borderColor: corBorda,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 3,
        elevation: 2
      }}
    >
      {/* Ícone / indicador */}
      <View
        className='w-12 h-12 rounded-full items-center justify-center mr-4'
        style={{
          backgroundColor: corIconeFundo
        }}
      >
        <Text className='text-xl'>
          {visualizado ? '✓' : '🔔'}
        </Text>
      </View>

      {/* Conteúdo */}
      <View className='flex-1'>
        <View className='flex-row items-center justify-between flex-wrap'>
          <Text
            className='text-base font-bold flex-1'
            style={{ color: colors.blackdark }}
            numberOfLines={2}
          >
            {titulo}
          </Text>
          {!visualizado && (
            <View
              className='rounded-full px-2 py-0.5 ml-2'
              style={{ backgroundColor: colors.tertiary40 }}
            >
              <Text className='text-xs font-semibold' style={{ color: colors.white }}>
                Nova
              </Text>
            </View>
          )}
        </View>
        <View className='flex-row items-center mt-1'>
          <Text className='text-xs' style={{ color: colors.gray }}>
            {data} às {hora}
          </Text>
        </View>
        {descricao && (
          <Text
            className='text-sm mt-1'
            style={{ color: colors.blackdark }}
            numberOfLines={2}
          >
            {descricao}
          </Text>
        )}
      </View>

      {/* Seta */}
      <View className='ml-2'>
        <Text className='text-lg' style={{ color: corSeta }}>
          ›
        </Text>
      </View>
    </TouchableOpacity>
  )
}
