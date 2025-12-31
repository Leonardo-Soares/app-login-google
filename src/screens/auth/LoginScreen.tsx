import {
  View,
  Text,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

import React, { useState } from 'react';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@theme/colors';
import { formStyles, typography } from '@theme/globalStyles';
import Logo from '../../../assets/icon.png';
import { useLogin } from '@hooks/useLogin';
import { GoogleSignin, User, isSuccessResponse } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  iosClientId: '729042460039-94o2afcsqiosc4nuddq3b067pt9upda4.apps.googleusercontent.com'
});

export function LoginScreen() {
  const [auth, setAuth] = useState<User | null>();

  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');

  async function handleGoogleSignIn() {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();

      if (isSuccessResponse(response)) {
        setAuth(response.data);
      } else {
        Alert.alert('Erro', 'Erro ao fazer login com o Google');
        console.error(response);
      }
    } catch (error: any) {
      Alert.alert('Erro', error.message);
      console.error(error);
    }
  }


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <LinearGradient
        colors={['#0a91c7', '#0a91c7']}
        start={[0.0, 0.5]}
        end={[1.0, 0.5]}
        locations={[0.0, 1.0]}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{ flex: 1, justifyContent: 'center', marginVertical: 32 }}
          >
            {!auth?.user &&
              <View style={{ paddingHorizontal: 40 }}>
                <View>
                  <Image
                    style={{
                      width: 90,
                      height: 60,
                      alignSelf: 'center',
                    }}
                    source={Logo}
                    resizeMode="contain"
                  />
                </View>
                <View style={{ marginBottom: 32 }}>
                  <Text style={typography.titleClean}>Bem-vindo de volta</Text>
                  <Text style={typography.subTitleClean}>Logar na sua conta</Text>
                </View>
                <View style={formStyles.compactInputWrapper}>
                  <FontAwesome
                    name="user"
                    size={24}
                    color={colors.primaryBlack}
                  />
                  <TextInput
                    style={formStyles.compactInput}
                    onChangeText={onChangeEmail}
                    keyboardType="email-address"
                    placeholder="E-mail"
                    value={email}
                  />
                </View>

                <View style={{ marginTop: 8, marginBottom: 24 }}>
                  <View style={formStyles.compactInputWrapper}>
                    <FontAwesome
                      name="lock"
                      size={24}
                      color={colors.primaryBlack}
                    />
                    <TextInput
                      style={formStyles.compactInput}
                      onChangeText={onChangePassword}
                      secureTextEntry={true}
                      maxLength={6}
                      value={password}
                      placeholder="Senha"
                    />
                  </View>
                </View>

                <TouchableOpacity
                  style={{
                    height: 48,
                    backgroundColor: '#ffffff',
                    borderRadius: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 24,
                  }}
                  onPress={() => {
                    console.log('Login tradicional');
                  }}
                >
                  {/* {isLoading ? (
                    <ActivityIndicator color={colors.primary} />
                  ) : (
                    <Text style={{ color: colors.primary, fontWeight: '700', fontSize: 16 }}>
                      Entrar
                    </Text>
                  )} */}
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
                  <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(255, 255, 255, 0.3)' }} />
                  <Text style={{ color: '#ffffff', marginHorizontal: 16, fontSize: 14 }}>
                    OU
                  </Text>
                  <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(255, 255, 255, 0.3)' }} />
                </View>

                <TouchableOpacity
                  style={{
                    height: 48,
                    backgroundColor: '#ffffff',
                    borderRadius: 8,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 24,
                  }}
                  onPress={handleGoogleSignIn}
                >
                  <MaterialCommunityIcons
                    name="google"
                    size={20}
                    color="#4285F4"
                    style={{ marginRight: 12 }}
                  />
                  <Text style={{ color: '#333333', fontWeight: '600', fontSize: 16 }}>
                    Continuar com Google
                  </Text>
                </TouchableOpacity>
              </View>
            }
            {auth?.user &&
              <View style={{ paddingHorizontal: 40, alignItems: 'center', width: '100%' }}>
                <View
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: 16,
                    padding: 24,
                    width: '100%',
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    elevation: 5,
                  }}
                >
                  {auth.user.photo ? (
                    <Image
                      source={{ uri: auth.user.photo }}
                      style={{
                        width: 120,
                        height: 120,
                        borderRadius: 60,
                        marginBottom: 20,
                        borderWidth: 4,
                        borderColor: '#0a91c7',
                      }}
                    />
                  ) : (
                    <View
                      style={{
                        width: 120,
                        height: 120,
                        borderRadius: 60,
                        backgroundColor: '#0a91c7',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 20,
                        borderWidth: 4,
                        borderColor: '#0a91c7',
                      }}
                    >
                      <FontAwesome name="user" size={50} color="#ffffff" />
                    </View>
                  )}

                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: '700',
                      color: '#333333',
                      marginBottom: 8,
                      textAlign: 'center',
                    }}
                  >
                    Bem-vindo, {auth.user.name}
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 12,
                      backgroundColor: '#f5f5f5',
                      paddingHorizontal: 16,
                      paddingVertical: 10,
                      borderRadius: 8,
                      width: '100%',
                    }}
                  >
                    <FontAwesome name="envelope" size={16} color="#666666" style={{ marginRight: 10 }} />
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#666666',
                        flex: 1,
                      }}
                      numberOfLines={1}
                    >
                      {auth.user.email}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 12,
                      backgroundColor: '#f5f5f5',
                      paddingHorizontal: 16,
                      paddingVertical: 10,
                      borderRadius: 8,
                      width: '100%',
                    }}
                  >
                    <FontAwesome name="id-card" size={16} color="#666666" style={{ marginRight: 10 }} />
                    <Text
                      style={{
                        fontSize: 12,
                        color: '#999999',
                        flex: 1,
                      }}
                      numberOfLines={1}
                    >
                      ID: {auth.user.id}
                    </Text>
                  </View>

                  <View
                    style={{
                      marginBottom: 24,
                      backgroundColor: '#f5f5f5',
                      paddingHorizontal: 16,
                      paddingVertical: 12,
                      borderRadius: 8,
                      width: '100%',
                    }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                      <FontAwesome name="key" size={16} color="#666666" style={{ marginRight: 10 }} />
                      <Text
                        style={{
                          fontSize: 12,
                          color: '#666666',
                          fontWeight: '600',
                        }}
                      >
                        ID Token
                      </Text>
                    </View>
                    <ScrollView
                      style={{
                        maxHeight: 100,
                        backgroundColor: '#ffffff',
                        borderRadius: 6,
                        padding: 10,
                      }}
                      nestedScrollEnabled={true}
                    >
                      <Text
                        style={{
                          fontSize: 10,
                          color: '#333333',
                          fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
                        }}
                        selectable={true}
                      >
                        {auth.idToken || 'Token não disponível'}
                      </Text>
                    </ScrollView>
                  </View>

                  <TouchableOpacity
                    style={{
                      height: 48,
                      backgroundColor: '#0a91c7',
                      borderRadius: 8,
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%',
                      flexDirection: 'row',
                    }}
                    onPress={async () => {
                      try {
                        await GoogleSignin.signOut();
                        setAuth(null);
                      } catch (error: any) {
                        Alert.alert('Erro', 'Erro ao fazer logout');
                        console.error(error);
                      }
                    }}
                  >
                    <FontAwesome name="sign-out" size={18} color="#ffffff" style={{ marginRight: 8 }} />
                    <Text style={{ color: '#ffffff', fontWeight: '700', fontSize: 16 }}>
                      Sair
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            }
          </View>
        </TouchableWithoutFeedback>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}
