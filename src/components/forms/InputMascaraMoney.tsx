import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import MaskInput from 'react-native-mask-input'
import Caption from '@components/typography/Caption'
import { colors } from 'src/styles/colors'

interface PropsIputaMascara {
  mt?: any
  mask?: any
  value?: any
  onBlur?: any
  label: string
  refInput?: any
  height?: number
  error?: boolean
  keyboardType: any
  onChangeText?: any
  disabled?: boolean
  maxLength?: number
  returnKeyType?: any
  placeholder?: string
  onSubmitEditing?: any
  clearInput?: () => void
}

export default function InputMascaraMoney(
  {
    mt,
    mask,
    value,
    onBlur,
    refInput,
    maxLength,
    error,
    placeholder,
    onChangeText,
    keyboardType,
    returnKeyType,
    onSubmitEditing,
    clearInput,
    height,
  }: PropsIputaMascara) {

  return (
    <View className='w-full' style={{ marginTop: mt ?? 0 }}>
      {clearInput &&
        <View className='w-full h-4 relative z-50'>
          <TouchableOpacity className='absolute h-12 flex top-10 right-2' onPress={clearInput}>
            <Caption
              fontSize={14}
              align={'center'}
              fontWeight={'500'}
              color={colors.primary20}
            >
              Limpar
            </Caption>
          </TouchableOpacity>
        </View>
      }
      <MaskInput
        mask={mask}
        value={value}
        ref={refInput}
        onBlur={onBlur}
        secureTextEntry={false}
        placeholder={placeholder}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        style={{
          color: '#49454F',
          borderColor: error ? '#FF0000' : '#49454F',
          height: height ?? 44,
        }}
        maxLength={maxLength ?? 9999}
        placeholderTextColor={'#49454F'}
        onSubmitEditing={onSubmitEditing}
        returnKeyType={returnKeyType ?? 'default'}
        className='bg-white overflow-scroll border-[1px] rounded-[4px] text-base pl-4'
      />
    </View>
  )
}



