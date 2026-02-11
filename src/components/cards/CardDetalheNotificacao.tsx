import React from 'react'
import { View, Text } from 'react-native'
import { colors } from '../../styles/colors'

export interface PropsNotificacao {
  id: number
  data: string
  hora: string
  titulo: string
  descricao: string | null
  visualizado?: boolean
}

export default function CardDetalheNotificacao({
  data,
  hora,
  titulo,
  descricao,
  visualizado = false
}: PropsNotificacao) {
  return (
    <View
      className='rounded-xl p-4 mb-3'
      style={{
        backgroundColor: visualizado ? colors.neutral90 : colors.primary90,
        borderLeftWidth: 4,
        borderLeftColor: colors.primary20
      }}
    >
      <View className='flex-row items-center justify-between mb-2'>
        <Text className='text-sm font-semibold' style={{ color: colors.primary20 }}>
          {data}
        </Text>
        <Text className='text-sm font-medium' style={{ color: colors.blackdark }}>
          {hora}
        </Text>
      </View>
      <Text className='text-base font-bold mb-1' style={{ color: colors.blackdark }}>
        {titulo}
      </Text>
      {descricao ? (
        <Text className='text-sm mt-1' style={{ color: colors.blackdark }}>
          {descricao}
        </Text>
      ) : (
        <Text className='text-sm mt-1 italic' style={{ color: colors.gray }}>
          Sem descrição
        </Text>
      )}
      {visualizado && (
        <Text className='text-xs mt-2' style={{ color: colors.gray }}>
          Visualizada
        </Text>
      )}
    </View>
  )
}
