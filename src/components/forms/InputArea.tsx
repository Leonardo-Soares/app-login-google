import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
import { View, StyleSheet } from 'react-native'

const BORDER_COLOR = '#49454F'
const BORDER_ACTIVE = '#6750A4'
const TEXT_COLOR = '#49454F'
const ERROR_COLOR = '#B3261E'

interface PropsInputOutlined {
  label?: string,
  onChange?: any,
  mt?: any,
  secureTextEntry?: boolean,
  placeholder?: string,
  keyboardType?: any,
  value?: any,
  height?: number,
  maxLength?: any
  textTransform?: any
  uppercase?: any
  error?: boolean
  editable?: boolean
  required?: boolean
}

export default function InputArea({
  label,
  onChange,
  mt,
  editable,
  placeholder,
  keyboardType,
  value,
  height,
  maxLength,
  uppercase,
  error,
  required,
}: PropsInputOutlined) {
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
          label={required ? `${label}*` : label}
          value={value}
          error={error}
          mode="outlined"
          multiline
          editable={editable}
          numberOfLines={4}
          onBlur={() => setFocused(false)}
          onFocus={() => setFocused(true)}
          outlineColor="transparent"
          activeOutlineColor="transparent"
          maxLength={maxLength}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor={TEXT_COLOR}
          autoCapitalize={uppercase ?? 'none'}
          keyboardType={keyboardType ?? 'default'}
          theme={{ roundness: 4 }}
          style={[styles.input, { minHeight: height ?? 120 }]}
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



