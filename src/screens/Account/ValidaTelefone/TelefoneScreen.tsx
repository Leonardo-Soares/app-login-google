import { colors } from '../../../styles/colors'
import React, { useEffect, useState } from 'react'
import H5 from '../../../components/typography/H5'
import { View, Image, Platform } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { MaskedTextInput } from 'react-native-mask-text'
import { useNavigate } from '../../../hooks/useNavigate'
import MainLayout from '../../../components/layout/MainLayout'
import { useGlobal } from '../../../context/GlobalContextProvider'
import FilledButton from '../../../components/buttons/FilledButton'
import HeaderPrimary from '../../../components/header/HeaderPrimary'

export default function TelefoneScreen({ navigation }: { navigation: any }) {
  const isFocused = useIsFocused()
  const { navigate } = useNavigate()
  const [telefone, setTelefone] = useState('')
  const [erroChecked, setErroChecked] = useState(false)
  const { setTelefoneDigitado, telefoneDigitado } = useGlobal()

  async function postTelefone() {
    navigation.navigate('ValidaCodigoScreen')
  }


  useEffect(() => {
    setTelefone(telefoneDigitado)
  }, [isFocused])

  return (
    <MainLayout>
      <View className='flex-1 justify-between items-center mb-8'>
        <HeaderPrimary
          titulo='Validação do número do telefone'
          descricao='Vamos validar o número do seu telefone para a sua maior segurança.'
        />

        <View className='w-full items-center px-4'>
          <H5>Digite o número do seu telefone</H5>

          <View className='w-full max-w-xs border-[#79747E] border-2 rounded-md mt-4' style={{ height: 46 }}>
            <Image
              className='absolute top-[8px] left-2'
              source={require('../../../../assets/img/icons/brasil.png')}
            />
            <View style={{ position: 'absolute', left: 56, top: Platform.OS === 'android' ? 8 : 12 }}>
              <H5 color={colors.blackbase}>+55</H5>
            </View>

            <MaskedTextInput
              mask="(99) 99999-9999"
              value={telefone}
              maxLength={15}
              keyboardType="numeric"
              placeholder="(00) 00000-0000"
              onChangeText={(text) => {
                setTelefone(text);
                setTelefoneDigitado(text);
              }}
              style={[
                {
                  color: colors.blackbase,
                  fontSize: 18,
                  fontWeight: '500',
                  marginLeft: 96,
                  height: 46,
                  paddingVertical: 0,
                  paddingHorizontal: 8,
                  fontVariant: ['tabular-nums'],
                },
              ]}
            />
          </View>
        </View>

        <View className='w-full mt-4 px-8'>
          <FilledButton
            title='Confirmar'
            onPress={() => postTelefone()}
          />
        </View>
      </View >
    </MainLayout>
  );
}


