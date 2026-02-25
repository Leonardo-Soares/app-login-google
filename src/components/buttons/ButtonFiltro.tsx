import React from 'react'
import { colors } from '../../styles/colors'
import IcoSetaDireita from '../../svg/IcoSetaDireita'
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native'

interface PropsFiltro {
  color?: any,
  title: string,
  onPress: () => void,
  fontsize?: number,
  image?: any,
  isActive?: any
  icon_color?: any
}

export default function ButtonFiltro({ title, onPress, color, fontsize, image, isActive, icon_color }: PropsFiltro) {
  return (
    <>
      {isActive === 1 &&
        <TouchableOpacity
          style={styles.button}
          onPress={onPress}
          activeOpacity={0.7}
        >
          <View style={styles.textWrap}>
            <Text
              numberOfLines={2}
              style={[
                styles.text,
                { color: color ?? colors.blackdark, fontSize: fontsize ?? 16 }
              ]}
            >
              {title}
            </Text>
          </View>
          <View style={styles.iconWrap}>
            <IcoSetaDireita color={icon_color ?? colors.blackbase} />
          </View>
        </TouchableOpacity>
      }
    </>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    paddingVertical: 16,
  },
  textWrap: {
    flex: 1,
    minWidth: 0,
    marginRight: 12,
  },
  text: {
    fontWeight: '500',
  },
  iconWrap: {
    flexShrink: 0,
  },
})

