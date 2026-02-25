import React from 'react';
import { colors } from '../../styles/colors';
import { TouchableOpacity, Text, Image, View } from 'react-native';

interface PropsPerfil {
  color?: any;
  image?: any;
  title: string;
  mt?: number;
  fontsize?: number;
  onPress: () => void;
  ativaicon?: boolean;
}

export default function ButtonPerfil({
  title,
  onPress,
  color,
  fontsize,
  image,
  ativaicon = true,
  mt = 0,
}: PropsPerfil) {
  return (
    <>
      <TouchableOpacity
        style={{ marginTop: mt }}
        className="flex-row items-center rounded-3xl"
        onPress={onPress}
        activeOpacity={1}
      >
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text
            className="font-medium"
            style={{
              color: color ?? colors.blackdark,
              fontSize: fontsize ?? 16,
            }}
          >
            {title}
          </Text>
        </View>
        {ativaicon &&
          <Image
            source={image ?? require('../../../assets/img/icons/arrow-r.png')}
            style={{ marginLeft: 8, flexShrink: 0 }}
          />
        }
      </TouchableOpacity>
    </>
  );
}
