import React, { useEffect, useState } from 'react'
import { useIsFocused, useRoute } from '@react-navigation/native'
import { api } from '../../../../service/api'
import { useNavigate } from '../../../../hooks/useNavigate'
import AsyncStorage from '@react-native-async-storage/async-storage'
import HeaderPrimary from '../../../../components/header/HeaderPrimary'
import MainLayoutAutenticado from '../../../../components/layout/MainLayoutAutenticado'
import { View, Text } from 'react-native'

interface Notificacao {
  id: string
  data: string
  hora: string
  titulo: string
  descricao: string
}

export default function NotificacoesDetalhesScreen() {
  const { navigate } = useNavigate()
  const isFocused = useIsFocused()
  const { params } = useRoute()
  const id = (params as { id?: string })?.id

  const [notificacao, setNotificacao] = useState<Notificacao | null>(null)

  useEffect(() => {
    if (!id) return

    let cancelled = false

    async function load() {
      const json = await AsyncStorage.getItem('infos-user')
      if (!json || cancelled) return

      const { token } = JSON.parse(json)
      const headers = { Authorization: `Bearer ${token}` }

      try {
        const res = await api.get(`/notificacoes/${id}`, { headers })
        const results = res.data?.results
        const item = Array.isArray(results) && results.length ? results[0] : res.data
        if (!cancelled && item?.titulo != null) setNotificacao(item)

        await api.post('/notificacoes', { notificacao_id: id }, { headers })
      } catch (e) {
        if (!cancelled) console.error('Erro ao carregar notificação:', e)
      }
    }

    load()
    return () => { cancelled = true }
  }, [id, isFocused])

  return (
    <MainLayoutAutenticado>
      <View className='w-full mt-4' />
      <HeaderPrimary
        titulo="Detalhes da notificação"
        voltarScreen={() => navigate('NotificacoesScreen')}
      />
      {notificacao && (
        <View className='mt-8 mx-4 rounded-2xl border border-[#E5E7EB] bg-white px-5 py-6'>
          <Text className='text-xs text-[#6B7280] mb-1'>
            {notificacao.data} • {notificacao.hora}
          </Text>
          <Text className='text-lg font-semibold text-[#111827] mb-3'>
            {notificacao.titulo}
          </Text>
          {notificacao.descricao &&
            <>
              <View className='h-[1px] bg-[#E5E7EB] mb-3' />
              <Text className='text-sm text-[#374151] leading-5'>
                {notificacao.descricao}
              </Text>
            </>
          }
        </View>
      )}
    </MainLayoutAutenticado>
  )
}
