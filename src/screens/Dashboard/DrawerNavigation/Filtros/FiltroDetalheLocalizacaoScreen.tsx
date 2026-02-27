import React, { useState, useEffect, useCallback } from 'react'
import {
  View,
  Image,
  Linking,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
} from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { useNavigate } from '../../../../hooks/useNavigate'
import { colors } from '../../../../styles/colors'
import H3 from '../../../../components/typography/H3'
import H5 from '../../../../components/typography/H5'
import Caption from '../../../../components/typography/Caption'
import HeaderPrimary from '../../../../components/header/HeaderPrimary'
import MainLayoutAutenticado from '../../../../components/layout/MainLayoutAutenticado'
import CardProduto from '../../../../components/cards/CardProduto'
import { api } from '../../../../service/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface AnuncianteItem {
  id?: number
  id_anunciante?: number
  cnpj?: string
  empresa?: string
  latitude?: string
  longitude?: string
  imagem_empresa?: string
  descricao_empresa?: string
  telefone?: string
  email?: string
  endereco?: string
}

export default function FiltroDetalheLocalizacaoScreen({ route }: { route?: any }) {
  const isFocused = useIsFocused()
  const { navigate } = useNavigate()
  const item = route?.params?.item as AnuncianteItem | undefined
  const [cupons, setCupons] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const loadCupons = useCallback(async () => {
    if (!item) {
      setLoading(false)
      return
    }
    const jsonValue = await AsyncStorage.getItem('infos-user')
    if (!jsonValue) {
      setLoading(false)
      return
    }
    const { token } = JSON.parse(jsonValue)
    const anuncianteId = item.id_anunciante ?? item.id
    const nomeEmpresa = (item.empresa ?? '').trim().toLowerCase()
    try {
      const { data } = await api.get('/cupons', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const results = data?.results ?? []
      const ativos = results.filter((c: any) => {
        const mesmoAnunciante =
          (anuncianteId != null && String(c.anunciante_id) === String(anuncianteId)) ||
          (nomeEmpresa && String((c.anunciante ?? '')).trim().toLowerCase() === nomeEmpresa)
        return mesmoAnunciante
      })
      setCupons(ativos)
    } catch {
      setCupons([])
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [item?.id, item?.id_anunciante, item?.empresa])

  useEffect(() => {
    loadCupons()
  }, [loadCupons])

  useEffect(() => {
    if (isFocused) loadCupons()
  }, [isFocused, loadCupons])

  const onRefresh = () => {
    setRefreshing(true)
    loadCupons()
  }

  const tracarRota = () => {
    if (item?.latitude && item?.longitude) {
      Linking.openURL(
        `https://www.google.com/maps/dir/?api=1&destination=${item.latitude},${item.longitude}`
      )
    }
  }

  const temContato = item?.telefone || item?.email || item?.endereco || item?.cnpj

  if (!item) {
    return (
      <MainLayoutAutenticado marginTop={0} marginHorizontal={0} bottomDrawer notScroll>
        <HeaderPrimary titulo="Estabelecimento" voltarScreen={() => navigate('FiltroLocalizacaoScreen')} />
        <View style={styles.centered}>
          <Caption fontSize={14} color={colors.neutralvariant50}>Estabelecimento não encontrado.</Caption>
        </View>
      </MainLayoutAutenticado>
    )
  }

  return (
    <MainLayoutAutenticado marginTop={0} marginHorizontal={0} bottomDrawer notScroll>
      <View className='w-full h-[2%]' />
      <HeaderPrimary titulo="Estabelecimento" voltarScreen={() => navigate('FiltroLocalizacaoScreen')} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary40}
            colors={[colors.primary40]}
          />
        }
      >
        <View style={styles.card}>
          <View style={styles.cardRow}>
            {item.imagem_empresa ? (
              <Image source={{ uri: item.imagem_empresa }} style={styles.logo} resizeMode="cover" />
            ) : (
              <View style={[styles.logo, styles.logoPlaceholder]} />
            )}
            <View style={styles.cardBody}>
              <H3>{item.empresa ?? 'Estabelecimento'}</H3>
              {item.descricao_empresa ? (
                <Caption fontSize={14} margintop={8} color={colors.neutralvariant30}>
                  {item.descricao_empresa}
                </Caption>
              ) : null}
            </View>
          </View>
        </View>

        {item.latitude && item.longitude && (
          <TouchableOpacity style={styles.botaoRota} onPress={tracarRota} activeOpacity={0.85}>
            <Caption fontSize={15} fontWeight="600" color={colors.white}>
              Traçar rota no mapa
            </Caption>
          </TouchableOpacity>
        )}


        {(!loading && cupons.length === 0 && temContato) || item.cnpj ? (
          <View style={styles.secao}>
            <H5 color={colors.primary20}>Informações</H5>
            <View style={styles.infoBox}>
              {item.cnpj ? (
                <View style={styles.infoRow}>
                  <Caption fontSize={14} color={colors.blackdark}>CNPJ: {item.cnpj}</Caption>
                </View>
              ) : null}
              {item.telefone ? (
                <View style={styles.infoRow}>
                  <Caption fontSize={14} color={colors.blackdark}>Telefone: {item.telefone}</Caption>
                </View>
              ) : null}
              {item.email ? (
                <View style={styles.infoRow}>
                  <Caption fontSize={14} color={colors.blackdark}>E-mail: {item.email}</Caption>
                </View>
              ) : null}
              {item.endereco ? (
                <View style={styles.infoRow}>
                  <Caption fontSize={14} color={colors.blackdark}>Endereço: {item.endereco}</Caption>
                </View>
              ) : null}
            </View>
          </View>
        ) : null}


        <View style={styles.secao}>
          <H5 color={colors.primary20}>Cupons ativos</H5>
          {loading ? (
            <View style={styles.loading}>
              <ActivityIndicator size="small" color={colors.primary40} />
            </View>
          ) : cupons.length > 0 ? (
            <View style={styles.listaCupons}>
              {cupons.map((c) => (
                <View key={c.id} style={styles.itemCupom}>
                  <CardProduto
                    id_oferta={c.id}
                    dados_gerais={c}
                    imagem_capa={c.imagem_cupom}
                    qr_code={c.codigo_cupom}
                    nome_empresa={c.anunciante}
                    categoria={c.categoria_cupom}
                    nome_produto={c.titulo_oferta}
                    id_anunciante={c.anunciante_id}
                    data_validade={c.data_validade}
                    foto_user={c.imagem_anunciante}
                    vantagem_reais={c.vantagem_reais}
                    total_avaliacao={c.qtd_avaliacoes}
                    status_favorito={c.status_favorito}
                    media_avaliacao={c.media_avaliacoes}
                    descricao_simples={c.descricao_oferta}
                    descricao_completa={c.descricao_completa}
                    vantagem_porcentagem={c.vantagem_porcentagem}
                    get_produtos={loadCupons}
                  />
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.empty}>
              <Caption fontSize={14} color={colors.neutralvariant50}>
                Nenhum cupom ativo no momento.
              </Caption>
            </View>
          )}
        </View>

        <View style={styles.footer} />
      </ScrollView>
    </MainLayoutAutenticado>
  )
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 120,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.primary90,
    marginBottom: 16,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.neutral90,
  },
  logoPlaceholder: {
    backgroundColor: colors.primary90,
  },
  cardBody: {
    flex: 1,
    marginLeft: 14,
    paddingVertical: 4,
  },
  botaoRota: {
    backgroundColor: colors.primary40,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  secao: {
    marginBottom: 24,
  },
  loading: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  listaCupons: {
    marginTop: 8,
  },
  itemCupom: {
    marginBottom: 12,
  },
  empty: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  infoBox: {
    marginTop: 8,
    padding: 16,
    backgroundColor: colors.ice,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.neutral90,
  },
  infoRow: {
    marginBottom: 6,
    color: colors.blackdark,
  },
  footer: {
    height: 24,
  },
})
