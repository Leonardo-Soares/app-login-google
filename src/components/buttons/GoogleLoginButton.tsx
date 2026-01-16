import React from 'react'
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native'
import { colors } from '../../styles/colors'
import IcoGoogle from '../../svg/IcoGoogle'

interface PropsGoogleLoginButton {
  onPress: () => void
  title?: string
}

export default function GoogleLoginButton({ onPress, title = 'Continuar com Google' }: PropsGoogleLoginButton) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <IcoGoogle />
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 32,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.neutral90,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  text: {
    fontSize: 16,
    color: colors.neutral10,
    fontWeight: '500',
    textAlign: 'center',
  },
})
