import React, { useEffect, useState } from 'react'
import { useIsFocused, useRoute } from '@react-navigation/native'
import { api } from '../../../../service/api'
import { useNavigate } from '../../../../hooks/useNavigate'
import AsyncStorage from '@react-native-async-storage/async-storage'
import HeaderPrimary from '../../../../components/header/HeaderPrimary'
import MainLayoutAutenticado from '../../../../components/layout/MainLayoutAutenticado'
import CardDetalheNotificacao from '../../../../components/cards/CardDetalheNotificacao'
import { View } from 'react-native'

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
    <MainLayoutAutenticado marginTop={16}>
      <HeaderPrimary
        titulo="Detalhes da notificação"
        voltarScreen={() => navigate('NotificacoesScreen')}
      />
      <View className='mt-6'>
        {notificacao && (
          <CardDetalheNotificacao
            id={Number(notificacao.id) || 0}
            data={notificacao.data}
            hora={notificacao.hora}
            titulo={notificacao.titulo}
            descricao={notificacao.descricao}
          />
        )}
      </View>
    </MainLayoutAutenticado>
  )
}
