import React, { useEffect, useCallback, useState } from 'react'
import { View } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import MainLayout from '../../../components/layout/MainLayout'
import { useGlobal } from '../../../context/GlobalContextProvider'
import FilledButton from '../../../components/buttons/FilledButton'
import HeaderPrimary from '../../../components/header/HeaderPrimary'
import InputOutlined from '../../../components/forms/InputOutlined'

function formatarTelefone(value: string): string {
  const apenasNumeros = value.replace(/\D/g, '').slice(0, 11)
  if (apenasNumeros.length <= 2) {
    return apenasNumeros.length ? `(${apenasNumeros}` : ''
  }
  if (apenasNumeros.length <= 7) {
    return `(${apenasNumeros.slice(0, 2)}) ${apenasNumeros.slice(2)}`
  }
  return `(${apenasNumeros.slice(0, 2)}) ${apenasNumeros.slice(2, 7)}-${apenasNumeros.slice(7)}`
}

export default function TelefoneScreen({ navigation }: { navigation: any }) {
  const isFocused = useIsFocused()
  const [telefone, setTelefone] = useState('')
  const { setTelefoneDigitado, telefoneDigitado } = useGlobal()

  const handleChangeTelefone = useCallback((text: string) => {
    const formatado = formatarTelefone(text)
    setTelefone(formatado)
    setTelefoneDigitado(formatado)
  }, [setTelefoneDigitado])

  useEffect(() => {
    setTelefone(telefoneDigitado ?? '')
  }, [isFocused])

  function postTelefone() {
    navigation.navigate('ValidaCodigoScreen')
  }

  return (
    <MainLayout>
      <View className='flex-1'>
        <HeaderPrimary
          titulo='Validação do número do telefone'
          descricao='Vamos validar o número do seu telefone para a sua maior segurança.'
        />

        <View className='flex-1 w-full px-6 justify-center'>
          <InputOutlined
            label="Número do telefone"
            placeholder="(00) 00000-0000"
            value={telefone}
            onChange={handleChangeTelefone}
            keyboardType="numeric"
            maxLength={16}
          />
        </View>

        <View className='w-full px-6 pb-8'>
          <FilledButton
            title='Confirmar'
            onPress={postTelefone}
          />
        </View>
      </View>
    </MainLayout>
  );
}


