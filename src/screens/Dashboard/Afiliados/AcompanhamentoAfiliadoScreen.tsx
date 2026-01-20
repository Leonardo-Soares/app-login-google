import H3 from '@components/typography/H3'
import H5 from '@components/typography/H5'
import Caption from '@components/typography/Caption'
import { useNavigate } from '@hooks/useNavigate'
import { useIsFocused } from '@react-navigation/native'
import React, { useEffect, useState, useRef } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import MainLayoutAutenticado from '@components/layout/MainLayoutAutenticado'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { colors } from '../../../styles/colors'
import Clipboard from '@react-native-clipboard/clipboard'
import Toast from 'react-native-toast-message'
import FilledButton from '@components/buttons/FilledButton'
import axios from 'axios'

export default function AcompanhamentoAfiliadoScreen() {
  const isFocused = useIsFocused()
  const { navigate } = useNavigate()
  const [dadosAfiliado, setDadosAfiliado] = useState<any>(null)

  async function getVerificaStatus() {
    const jsonValue = await AsyncStorage.getItem('infos-user')
    if (jsonValue) {
      const newJson = JSON.parse(jsonValue)
      const headers = {
        Authorization: `Bearer ${newJson.token}`,
      }

      const formData = {
        email: newJson.email,
      }

      try {
        const response = await axios.post('https://www.backend.discontapp.com.br/api/afiliados/verificar-status', formData, { headers })

        // Se o status for aprovado, salva os dados no estado
        if (response.data.data && response.data.data.status_aprovacao === 'aprovado') {
          setDadosAfiliado({
            codigo_afiliado: response.data.data.codigo_afiliado,
            data_aprovacao: response.data.data.data_aprovacao,
            data_cadastro: response.data.data.data_cadastro,
            status: response.data.data.status_aprovacao,
          })
        }
        if (response.data.data && response.data.data.status_aprovacao === 'pendente') {
          setDadosAfiliado({
            codigo_afiliado: response.data.data.codigo_afiliado,
            data_aprovacao: null,
            data_cadastro: response.data.data.data_cadastro,
            status: response.data.data.status_aprovacao,
          })
        }
        if (response.data.data && response.data.data.status_aprovacao === 'reprovado') {
          setDadosAfiliado({
            codigo_afiliado: null,
            data_aprovacao: null,
            data_cadastro: response.data.data.data_cadastro,
            status: response.data.data.status_aprovacao,
            motivo_reprovacao: response.data.data.motivo_reprovacao,
          })
        }

      } catch (error: any) {
        console.error('Error verificar status: ', error)
      }
    }
  }

  // Função para copiar código do afiliado
  const copyCodigoAfiliado = () => {
    if (dadosAfiliado?.codigo_afiliado) {
      Clipboard.setString(dadosAfiliado.codigo_afiliado)
      Toast.show({
        type: 'success',
        text1: 'Código copiado para a área de transferência!',
      })
    }
  }

  // Função para obter cor do status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aprovado':
        return '#4CAF50'
      case 'reprovado':
        return colors.error40
      case 'pendente':
      default:
        return colors.warning
    }
  }

  useEffect(() => {
    if (isFocused) {
      getVerificaStatus()
    }
  }, [isFocused])

  return (
    <MainLayoutAutenticado notScroll={false} loading={false} marginTop={24} marginHorizontal={16}>
      <View className='flex-1 mt-12'>
        {dadosAfiliado ? (
          <>
            <View className='mb-6'>
              <H3 align={'center'}>Acompanhamento de Afiliado</H3>
              <Caption fontSize={14} color={colors.gray} margintop={8} align={'center'}>
                Consulte o status e informações do seu cadastro
              </Caption>
            </View>

            <View className='w-full mt-6'>
              {
                dadosAfiliado.codigo_afiliado &&
                <View className='bg-[#F5F5F5] rounded-lg p-4 mb-4'>
                  <Caption fontSize={12} color={colors.gray} margintop={0}>
                    Código do Afiliado
                  </Caption>
                  <View className='flex-row items-center justify-between'>
                    <H5>{dadosAfiliado.codigo_afiliado}</H5>
                    <TouchableOpacity
                      onPress={copyCodigoAfiliado}
                      className='bg-[#E5DEFF] px-3 py-2 rounded-lg'
                    >
                      <Caption fontSize={12} color={colors.primary40} fontWeight={'bold'}>
                        Copiar
                      </Caption>
                    </TouchableOpacity>
                  </View>
                </View>
              }


              <View className='bg-[#F5F5F5] rounded-lg p-4 mb-4'>
                <Caption fontSize={12} color={colors.gray} margintop={0}>
                  Status
                </Caption>
                <View className='flex-row items-center mt-1'>
                  <View
                    className='w-3 h-3 rounded-full mr-2'
                    style={{ backgroundColor: getStatusColor(dadosAfiliado.status) }}
                  />
                  <Text style={{ textTransform: 'capitalize', fontSize: 18, fontWeight: 'bold', color: colors.dark }}>
                    {dadosAfiliado.status}
                  </Text>
                </View>
              </View>

              <View className='bg-[#F5F5F5] rounded-lg p-4 mb-4'>
                <Caption fontSize={12} color={colors.gray} margintop={0}>
                  Data de Cadastro
                </Caption>
                <H5>{dadosAfiliado.data_cadastro}</H5>
              </View>

              {dadosAfiliado.data_aprovacao &&
                <View className='bg-[#F5F5F5] rounded-lg p-4 mb-4'>
                  <Caption fontSize={12} color={colors.gray} margintop={0}>
                    Data de Aprovação
                  </Caption>
                  <H5>{dadosAfiliado.data_aprovacao}</H5>
                </View>
              }

              {dadosAfiliado.status === 'reprovado' && dadosAfiliado.motivo_reprovacao &&
                <View className='bg-[#F5F5F5] rounded-lg p-4 mb-4'>
                  <Caption fontSize={12} color={colors.gray} margintop={0}>
                    Motivo de Reprovação
                  </Caption>
                  <H5>{dadosAfiliado.motivo_reprovacao}</H5>
                </View>
              }

            </View>
          </>
        ) : (
          <>
            <View className='mb-6'>
              <H3 align={'center'}>Programa de Afiliados</H3>
              <Caption fontSize={14} color={colors.gray} margintop={8} align={'center'}>
                Ganhe comissões indicando novos clientes
              </Caption>
            </View>

            <View className='w-full mt-6'>
              <View className='bg-[#F5F5F5] rounded-lg p-4 mb-4'>
                <View className='mb-2'>
                  <H5>Como funciona?</H5>
                </View>
                <Caption fontSize={14} color={colors.dark} margintop={0}>
                  Cadastre-se como afiliado e receba um código único. Compartilhe esse código com seus amigos e ganhe comissões a cada novo cadastro realizado através do seu link.
                </Caption>
              </View>

              <View className='bg-[#F5F5F5] rounded-lg p-4 mb-4'>
                <View className='mb-2'>
                  <H5>Benefícios</H5>
                </View>
                <View className='mt-2'>
                  <Caption fontSize={14} color={colors.dark} margintop={4}>
                    • Ganhe comissões por cada indicação
                  </Caption>
                  <Caption fontSize={14} color={colors.dark} margintop={4}>
                    • Receba pagamentos via PIX
                  </Caption>
                  <Caption fontSize={14} color={colors.dark} margintop={4}>
                    • Acompanhe suas indicações em tempo real
                  </Caption>
                  <Caption fontSize={14} color={colors.dark} margintop={4}>
                    • Sem custos para participar
                  </Caption>
                </View>
              </View>

              <View className='bg-[#F5F5F5] rounded-lg p-4 mb-4'>
                <View className='mb-2'>
                  <H5>Requisitos</H5>
                </View>
                <Caption fontSize={14} color={colors.dark} margintop={0}>
                  Para se cadastrar como afiliado, você precisa ter uma conta ativa e preencher seus dados bancários para receber as comissões.
                </Caption>
              </View>

              <View className='mt-8 mb-8'>
                <FilledButton
                  title="Cadastrar-me como afiliado"
                  onPress={() => navigate('CadastroAfiliadoScreen')}
                />
              </View>
            </View>
          </>
        )}

      </View>
    </MainLayoutAutenticado>
  )
}
