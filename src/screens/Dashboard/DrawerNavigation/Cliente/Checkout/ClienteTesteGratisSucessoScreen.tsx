import React, { useEffect, useRef } from 'react'
import { View, Image, ScrollView, StyleSheet, Animated, Dimensions } from 'react-native'
import { useNavigate } from '../../../../../hooks/useNavigate'
import H2 from '../../../../../components/typography/H2'
import FilledButton from '../../../../../components/buttons/FilledButton'
import MainLayoutAutenticadoSemScroll from '../../../../../components/layout/MainLayoutAutenticadoSemScroll'
import Caption from '../../../../../components/typography/Caption'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

export default function ClienteTesteGratisSucessoScreen() {
  const { navigate } = useNavigate()
  const fadeIcon = useRef(new Animated.Value(0)).current
  const scaleIcon = useRef(new Animated.Value(0.85)).current
  const fadeTitle = useRef(new Animated.Value(0)).current
  const fadeCaption = useRef(new Animated.Value(0)).current

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
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(fadeTitle, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(fadeCaption, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  return (
    <MainLayoutAutenticadoSemScroll marginTop={0} marginHorizontal={0}>
      <View style={styles.container}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
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
              <H2 align="center" title="Parabéns, tudo pronto para iniciar o seu teste 🎉🎉🎉" />
            </Animated.View>

            <Animated.View style={[styles.captionBlock, { opacity: fadeCaption }]}>
              <Caption align="center" fontSize={16} fontWeight="500">
                Agora você pode aproveitar as funcionalidades do Discontapp, impulsionando as suas vendas, através dos nossos cupons.
              </Caption>
            </Animated.View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <FilledButton
            onPress={() => navigate('ClienteTabNavigation', { screen: 'HomeClienteScreen' })}
            title="Aproveitar o teste gratuito"
          />

        </View>
      </View>
    </MainLayoutAutenticadoSemScroll>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingTop: 24,
    paddingBottom: 24,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 280,
  },
  iconWrapper: {
    marginBottom: 24,
  },
  icon: {
    width: Math.min(280, SCREEN_WIDTH * 0.7),
    height: Math.min(280, SCREEN_WIDTH * 0.7),
  },
  textBlock: {
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  captionBlock: {
    paddingHorizontal: 8,
  },
  footer: {
    width: '100%',
    paddingHorizontal: 28,
    paddingBottom: 24,
    paddingTop: 16,
  },
})
