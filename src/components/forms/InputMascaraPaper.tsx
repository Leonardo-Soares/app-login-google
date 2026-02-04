import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'

const BORDER_COLOR = '#49454F'
const BORDER_ACTIVE = '#6750A4'
const TEXT_COLOR = '#49454F'
const ERROR_COLOR = '#B3261E'

interface PropsIputaMascara {
  mt?: any,
  value?: any,
  onBlur?: any,
  label: string,
  height?: number,
  keyboardType: any,
  disabled?: boolean
  onChangeText?: any,
  maxLength?: number,
  placeholder?: string,
  refInput?: any
  onSubmitEditing?: any
  returnKeyType?: any
  error?: boolean
  required?: boolean
}

export default function InputMascaraPaper(
  {
    mt,
    label,
    value,
    height,
    onBlur,
    disabled,
    maxLength,
    placeholder,
    onChangeText,
    keyboardType,
    refInput,
    onSubmitEditing,
    returnKeyType,
    error,
    required
  }: PropsIputaMascara) {
  const [focused, setFocused] = useState(false)

  const borderColor = error
    ? ERROR_COLOR
    : focused
      ? BORDER_ACTIVE
      : BORDER_COLOR

  return (
    <View style={[styles.wrapper, { marginTop: mt ?? 0 }]}>
      <View style={[styles.borderContainer, { borderColor }]}>
        <TextInput
          ref={refInput}
          label={required ? `${label}*` : label}
          value={value}
          error={error}
          mode="outlined"
          onBlur={(e) => {
            setFocused(false)
            onBlur?.(e)
          }}
          onFocus={() => setFocused(true)}
          returnKeyType={returnKeyType ?? 'default'}
          onSubmitEditing={onSubmitEditing}
          disabled={disabled}
          secureTextEntry={false}
          outlineColor="transparent"
          activeOutlineColor="transparent"
          placeholder={placeholder}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          maxLength={maxLength ?? 9999}
          placeholderTextColor={TEXT_COLOR}
          style={styles.input}
          theme={{ roundness: 4 }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  borderContainer: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  input: {
    color: TEXT_COLOR,
    backgroundColor: 'transparent',
  },
})



