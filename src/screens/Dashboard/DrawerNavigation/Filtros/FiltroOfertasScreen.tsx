import React from 'react'
import { useNavigate } from '../../../../hooks/useNavigate'
import ButtonFiltro from '../../../../components/buttons/ButtonFiltro'
import MainLayoutAutenticado from '../../../../components/layout/MainLayoutAutenticado'
import Spacing from '@components/layout/Spacing'
import { View } from 'react-native'

export default function FiltroOfertas() {
  const { navigate } = useNavigate()

  return (
    <MainLayoutAutenticado bottomDrawer>
      <View className='w-full mt-16' />
      <ButtonFiltro
        isActive={1}
        title='Melhores ofertas (em reais)'
        onPress={() => navigate('FiltroOfertasReaisScreen')}
      />
      <ButtonFiltro
        isActive={1}
        title='Melhores ofertas (em porcentagem)'
        onPress={() => navigate('FiltroOfertasPorcentagemScreen')}
      />
    </MainLayoutAutenticado>
  )
}
