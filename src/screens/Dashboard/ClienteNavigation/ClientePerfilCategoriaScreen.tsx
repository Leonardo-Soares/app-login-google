import { api } from '../../../service/api';
import Toast from 'react-native-toast-message';
import React, { useEffect, useState } from 'react';
import { useNavigate } from '../../../hooks/useNavigate';
import LinearGradient from 'react-native-linear-gradient';
import Paragrafo from '../../../components/typography/Paragrafo';
import ButtonPerfil from '../../../components/buttons/ButtonPerfil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainLayoutAutenticado from '../../../components/layout/MainLayoutAutenticado';
import {
  View,
  TouchableOpacity,
  RefreshControl,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  Text,
} from 'react-native';
import ButtonOutline from '@components/buttons/ButtonOutline';
import { colors } from 'src/styles/colors';

export default function ClientePerfilCategoriaScreen() {
  const { navigate } = useNavigate();
  const [loading, setLoading] = useState(false);
  const screenWidth = Dimensions.get('window').width;
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [listaCategorias, setListaCategorias] = useState([]);
  const [listaCategoriasPerfil, setListaCategoriasPerfil] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
  const [originalSelectedOptions, setOriginalSelectedOptions] = useState<any[]>(
    [],
  );
  const [needSave, setNeedSave] = useState(false);

  const handleSelectOption = (option: any) => {
    let updatedOptions: any[];
    if (selectedOptions.includes(option)) {
      updatedOptions = selectedOptions.filter(
        (selectedOption) => selectedOption !== option
      );
    } else {
      if (selectedOptions.length < 3) {
        updatedOptions = [...selectedOptions, option];
      } else {
        Toast.show({
          type: 'error',
          text1: 'O limite máximo é 3 perfis !',
        });
        return;
      }
    }
    setSelectedOptions(updatedOptions);
  };

  async function getCategorias() {
    try {
      const response = await api.get('/categorias/cadastro');
      setListaCategorias(response.data.results);
    } catch (error: any) {
      console.log('Erro ao buscar categorias', error.response.data);
    }
  }

  async function savePerfil() {
    const jsonValue = await AsyncStorage.getItem('infos-user');
    if (jsonValue) {
      const newJson = JSON.parse(jsonValue);
      try {
        const headers = {
          Authorization: `Bearer ${newJson.token}`,
        };
        const response = await api.post(
          '/atualiza-categorias',
          { categorias: selectedOptions },
          { headers }
        );
        // navigate('ClientePerfilScreen')
        Toast.show({
          type: 'success',
          text1: 'Categorias atualizadas!',
        });
        setNeedSave(false);
        getPerfil();
      } catch (error: any) {
        console.log('ERROR POST Atualizar Categorias', error.response.data);
      }
    }
  }

  async function getPerfil() {
    const jsonValue = await AsyncStorage.getItem('infos-user');
    if (jsonValue) {
      const newJson = JSON.parse(jsonValue);
      try {
        const response = await api.get(`/perfil/pessoa-juridica/${newJson.id}`);
        const perfil = response.data.results.perfil_id || [];
        setListaCategoriasPerfil(perfil);

        const idsSelecionados = perfil
          .map((categoria: any) => {
            if (typeof categoria === 'number' || typeof categoria === 'string') {
              return categoria;
            }
            if (categoria?.categoria_id != null) {
              return categoria.categoria_id;
            }
            if (categoria?.id != null) {
              return categoria.id;
            }
            return null;
          })
          .filter((id: any) => id != null);

        setSelectedOptions(idsSelecionados);
        setOriginalSelectedOptions(idsSelecionados);
      } catch (error: any) {
        console.log('Error GET Perfil: ', error.response.data);
      }
    }
  }

  const renderItemSegundo = ({ item }: any) => {
    const isSelected = selectedOptions.some(
      (categoria: any) => categoria === item.id
    );

    return (
      <View style={styles.container}>
        <View style={styles.column}></View>
        <LinearGradient
          style={[
            styles.block,
            isSelected && {
              borderColor: '#4F46E5',
              borderWidth: 3,
              transform: [{ scale: 1.03 }],
              shadowColor: '#4F46E5',
              shadowOpacity: 0.25,
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 3 },
              elevation: 4,
            },
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1.2 }}
          colors={[
            isSelected ? '#EEF2FF' : '#775AFF',
            isSelected ? '#E0E7FF' : '#B2C5FF',
          ]}
        >
          <TouchableOpacity
            className="flex-1 items-center justify-center px-2"
            onPress={() => handleSelectOption(item.id)}
          >
            {isSelected && (
              <View className="absolute top-1 right-1 px-2 py-[2px] rounded-full bg-[#4F46E5]">
                <Text className="text-[10px] font-semibold text-white">
                  Selecionado
                </Text>
              </View>
            )}
            <View className="items-center justify-center">
              {item.icon ? (
                item.icon
              ) : (
                <Image className="w-12 h-12 mb-2" source={{ uri: item.icone }} />
              )}
              {item.categorias !== '' && (
                <Text
                  className="text-[11px] font-medium text-center"
                  style={{ color: isSelected ? '#111827' : '#2F009C' }}
                  numberOfLines={2}
                >
                  {item.categorias}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  useEffect(() => {
    getPerfil();
    getCategorias();
  }, []);

  useEffect(() => {
    const atual = [...selectedOptions].sort((a, b) => a - b);
    const original = [...originalSelectedOptions].sort((a, b) => a - b);
    setNeedSave(JSON.stringify(atual) !== JSON.stringify(original));
  }, [selectedOptions, originalSelectedOptions]);

  const categoriasSelecionadasNomes =
    listaCategorias
      .filter((cat: any) => selectedOptions.includes(cat.id))
      .map((cat: any) => cat.categorias) || [];

  const categoriasOriginaisNomes =
    listaCategorias
      .filter((cat: any) => originalSelectedOptions.includes(cat.id))
      .map((cat: any) => cat.categorias) || [];

  return (
    <MainLayoutAutenticado notScroll marginTop={20}>
      <ButtonPerfil
        mt={64}
        fontsize={24}
        title="Perfil - Categorias"
        onPress={() => { }}
        image={
          needSave
            ? require('../../../../assets/img/icons/save.png')
            : require('../../../../assets/img/icons/save-mark.png')
        }
      />

      <View className="mt-4 px-4">
        {categoriasOriginaisNomes.length > 0 && (
          <View className="mb-3">
            <Text className="text-xs font-semibold text-[#6B7280]">
              Categorias já salvas
            </Text>
            <View className="flex-row flex-wrap mt-1">
              {categoriasOriginaisNomes.map((nome: string, index: number) => (
                <View
                  key={`orig-${nome}-${index}`}
                  className="px-3 py-1 mr-2 mb-2 rounded-full bg-[#E5E7EB]"
                >
                  <Text className="text-xs font-medium text-[#374151]">
                    {nome}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <Text className="text-sm font-semibold text-[#111827]">
          Categorias selecionadas agora ({selectedOptions.length}/3)
        </Text>
        {categoriasSelecionadasNomes.length > 0 ? (
          <View className="flex-row flex-wrap mt-2">
            {categoriasSelecionadasNomes.map((nome: string, index: number) => (
              <View
                key={`${nome}-${index}`}
                className="px-3 py-1 mr-2 mb-2 rounded-full bg-[#EEF2FF]"
              >
                <Text className="text-xs font-medium text-[#3730A3]">
                  {nome}
                </Text>
              </View>
            ))}
          </View>
        ) : (
          <Text className="text-xs text-[#6B7280] mt-1">
            Nenhuma categoria selecionada ainda. Toque em uma categoria abaixo para escolher.
          </Text>
        )}
      </View>

      <FlatList
        data={listaCategorias}
        renderItem={renderItemSegundo}
        numColumns={screenWidth > 375 ? 3 : 2}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
        contentContainerStyle={{ paddingBottom: 32, paddingHorizontal: 8 }}
        ListFooterComponent={
          <View className="mt-4 mb-8 px-4">
            <ButtonOutline
              title="Atualizar categorias"
              onPress={savePerfil}
              disabled={!needSave}
            />
          </View>
        }
      />

    </MainLayoutAutenticado>
  );
}

const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6,
    maxWidth: '50%',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    alignItems: 'center',
  },
  block: {
    height: 140,
    width: '100%',
    borderRadius: 14,
    marginVertical: 6,
    backgroundColor: 'blue',
  },
});
