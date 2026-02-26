import React, { useEffect, useRef } from 'react'
import { View, Image, ScrollView, StyleSheet, Animated, Dimensions } from 'react-native'
import { useNavigate } from '../../../../../hooks/useNavigate'
import H2 from '../../../../../components/typography/H2'
import FilledButton from '../../../../../components/buttons/FilledButton'
import MainLayoutSecondary from '../../../../../components/layout/MainLayoutSecondary'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

export default function ClienteSucessoPagamentoPixScreen() {
  const { navigate } = useNavigate()
  const fadeIcon = useRef(new Animated.Value(0)).current
  const scaleIcon = useRef(new Animated.Value(0.8)).current
  const fadeTitle = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeIcon, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(scaleIcon, {
          toValue: 1,
          friction: 8,
          tension: 50,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(fadeTitle, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  return (
    <View style={{ flex: 1 }}>

      <View style={styles.content}>
        <Animated.View
          style={[
            styles.iconWrapper,
            {
              opacity: fadeIcon,
              transform: [{ scale: scaleIcon }],
            },
          ]}
        >
          <Image
            source={require('../../../../../../assets/img/icons/icon-sucesso.png')}
            style={styles.icon}
            resizeMode="contain"
          />
        </Animated.View>

        <Animated.View style={[styles.textBlock, { opacity: fadeTitle }]}>
          <H2 align="center" title="Pagamento realizado com sucesso!" />
        </Animated.View>
      </View>

      <View style={styles.footer}>
        <FilledButton
          onPress={() => navigate('ClienteTabNavigation', { screen: 'HomeClienteScreen' })}
          title="Continuar"
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({

  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingTop: 24,
    paddingBottom: 24,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  iconWrapper: {
    marginBottom: 24,
  },
  icon: {
    width: Math.min(280, SCREEN_WIDTH * 0.7),
    height: Math.min(280, SCREEN_WIDTH * 0.7),
  },
  textBlock: {
    width: '100%',
    paddingHorizontal: 8,
  },
  footer: {
    width: '100%',
    paddingHorizontal: 28,
    paddingBottom: 32,
    paddingTop: 16,
  },
})
