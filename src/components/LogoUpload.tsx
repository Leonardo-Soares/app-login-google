import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';

interface LogoUploadProps {
  imageUri?: string;
  onPress: () => void;
  label?: string;
  labelWithImage?: string;
  size?: number;
  style?: ViewStyle;
}

const SIZE = 112;

export default function LogoUpload({
  imageUri,
  onPress,
  label = 'Adicionar Logomarca',
  labelWithImage = 'Toque para alterar',
  size = SIZE,
  style,
}: LogoUploadProps) {
  const hasImage = Boolean(imageUri?.trim());
  const borderRadius = size / 2;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={[styles.wrapper, style]}
    >
      <View style={styles.column}>
        <View style={[styles.container, { width: size, height: size, borderRadius }]}>
          {hasImage ? (
            <>
              <Image
                source={{ uri: imageUri }}
                style={[styles.image, { width: size, height: size, borderRadius }]}
                resizeMode="cover"
              />
              <View style={[styles.overlay, { borderRadius }]} />
            </>
          ) : (
            <View style={[styles.placeholder, { width: size, height: size, borderRadius }]}>
              <View style={styles.iconCircle}>
                <Image
                  source={require('../../assets/img/icons/camera-gray.png')}
                  style={styles.icon}
                  resizeMode="contain"
                />
              </View>
            </View>
          )}
        </View>
        <Text style={styles.labelBelow} numberOfLines={2}>
          {hasImage ? labelWithImage : label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'center',
    marginTop: 24,
    marginBottom: 24,
  },
  column: {
    alignItems: 'center',
    minWidth: 140,
  },
  container: {
    position: 'relative',
    overflow: 'hidden',
  },
  placeholder: {
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#D0D0D0',
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  icon: {
    width: 22,
    height: 22,
    opacity: 0.7,
  },
  labelBelow: {
    marginTop: 8,
    fontSize: 12,
    color: '#6B6B6B',
    fontWeight: '400',
    textAlign: 'center',
    paddingHorizontal: 4,
  },
  image: {
    backgroundColor: '#F5F5F5',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
});
