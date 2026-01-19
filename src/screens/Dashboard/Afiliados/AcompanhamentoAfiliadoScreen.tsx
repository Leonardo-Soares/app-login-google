import { useNavigate } from '@hooks/useNavigate'
import React, { useEffect, useState, useRef } from 'react'
import { useIsFocused } from '@react-navigation/native'
import MainLayoutAutenticado from '@components/layout/MainLayoutAutenticado'
import { Text, TouchableOpacity, View } from 'react-native'
import InputOutlined from '@components/forms/InputOutlined'
import InputMascaraPaper from '@components/forms/InputMascaraPaper'
import FilledButton from '@components/buttons/FilledButton'
import RadioButton from '@components/forms/RadioButton'
import H3 from '@components/typography/H3'
import H5 from '@components/typography/H5'
import Caption from '@components/typography/Caption'
import { colors } from '../../../styles/colors'
import Toast from 'react-native-toast-message'
import { api } from '../../../service/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function AcompanhamentoAfiliadoScreen() {
  const isFocused = useIsFocused()
  const { navigate } = useNavigate()

  // Estados dos campos
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [password, setPassword] = useState('')
  const [cpf, setCpf] = useState('')
  const [banco, setBanco] = useState('')
  const [agencia, setAgencia] = useState('')
  const [contaCorrente, setContaCorrente] = useState('')
  const [tipoChavePix, setTipoChavePix] = useState('')
  const [chavePix, setChavePix] = useState('')
  const [aceiteTermos, setAceiteTermos] = useState(false)

  // Estados de erro
  const [errorName, setErrorName] = useState(false)
  const [errorEmail, setErrorEmail] = useState(false)
  const [errorTelefone, setErrorTelefone] = useState(false)
  const [errorPassword, setErrorPassword] = useState(false)
  const [errorCpf, setErrorCpf] = useState(false)
  const [errorBanco, setErrorBanco] = useState(false)
  const [errorAgencia, setErrorAgencia] = useState(false)
  const [errorContaCorrente, setErrorContaCorrente] = useState(false)
  const [errorTipoChavePix, setErrorTipoChavePix] = useState(false)
  const [errorChavePix, setErrorChavePix] = useState(false)
  const [errorAceiteTermos, setErrorAceiteTermos] = useState(false)

  // Estados auxiliares
  const [loading, setLoading] = useState(false)

  // Refs para navegação entre campos
  const input1Ref = useRef(null)
  const input2Ref = useRef(null)
  const input3Ref = useRef(null)
  const input4Ref = useRef(null)
  const input5Ref = useRef(null)
  const input6Ref = useRef(null)
  const input7Ref = useRef(null)
  const input8Ref = useRef(null)
  const input9Ref = useRef(null)
  const input10Ref = useRef(null)

  // Lista de bancos (exemplo - pode ser buscada de uma API)
  const listaBancos = [
    'Banco do Brasil',
    'Bradesco',
    'Itaú',
    'Santander',
    'Caixa Econômica Federal',
    'Banco Inter',
    'Nubank',
    'Banco Original',
    'Banco Neon',
    'Outro'
  ]

  // Opções de tipo de chave PIX
  const tiposChavePix = ['cpf', 'email', 'telefone', 'aleatoria']

  // Função para navegar entre inputs
  const focusNextInput = (ref: any) => {
    if (ref && ref.current) {
      ref.current.focus()
    }
  }

  // Máscara de CPF
  const handleCPFMask = (value: any) => {
    let cpfFormatted = value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{2})$/, '$1-$2')
    setCpf(cpfFormatted)
  }

  // Máscara de telefone
  const handlePhoneMask = (value: any) => {
    let phone = value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
    setTelefone(phone)
  }

  // Validação de email
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  // Validação de CPF (básica - apenas formato)
  const validateCPF = (cpf: string) => {
    const cpfNumbers = cpf.replace(/\D/g, '')
    return cpfNumbers.length === 11
  }

  // Validação de telefone
  const validatePhone = (phone: string) => {
    const phoneNumbers = phone.replace(/\D/g, '')
    return phoneNumbers.length === 10 || phoneNumbers.length === 11
  }

  // Validação de senha
  const validatePassword = (password: string) => {
    return password.length >= 8
  }

  // Função de validação geral
  const validateForm = () => {
    let isValid = true

    // Resetar erros
    setErrorName(false)
    setErrorEmail(false)
    setErrorTelefone(false)
    setErrorPassword(false)
    setErrorCpf(false)
    setErrorBanco(false)
    setErrorAgencia(false)
    setErrorContaCorrente(false)
    setErrorTipoChavePix(false)
    setErrorChavePix(false)
    setErrorAceiteTermos(false)

    // Validar nome
    if (!name.trim()) {
      setErrorName(true)
      isValid = false
    }

    // Validar email
    if (!email.trim() || !validateEmail(email)) {
      setErrorEmail(true)
      isValid = false
    }

    // Validar telefone
    if (!telefone.trim() || !validatePhone(telefone)) {
      setErrorTelefone(true)
      isValid = false
    }

    // Validar senha
    if (!password || !validatePassword(password)) {
      setErrorPassword(true)
      isValid = false
    }

    // Validar CPF
    if (!cpf.trim() || !validateCPF(cpf)) {
      setErrorCpf(true)
      isValid = false
    }

    // Validar banco
    if (!banco.trim()) {
      setErrorBanco(true)
      isValid = false
    }

    // Validar agência
    if (!agencia.trim()) {
      setErrorAgencia(true)
      isValid = false
    }

    // Validar conta corrente
    if (!contaCorrente.trim()) {
      setErrorContaCorrente(true)
      isValid = false
    }

    // Validar tipo chave PIX
    if (!tipoChavePix) {
      setErrorTipoChavePix(true)
      isValid = false
    }

    // Validar chave PIX
    if (!chavePix.trim()) {
      setErrorChavePix(true)
      isValid = false
    }

    // Validar aceite de termos
    if (!aceiteTermos) {
      setErrorAceiteTermos(true)
      isValid = false
    }

    return isValid
  }

  // Função de submit
  const handleSubmit = async () => {
    if (!validateForm()) {
      Toast.show({
        type: 'error',
        text1: 'Por favor, preencha todos os campos corretamente',
      })
      return
    }

    setLoading(true)

    try {
      // Preparar dados para envio
      const dadosAfiliado = {
        name: name.trim(),
        email: email.trim(),
        telefone: telefone.replace(/\D/g, ''),
        password: password,
        cpf: cpf.replace(/\D/g, ''),
        banco: banco.trim(),
        agencia: agencia.trim(),
        conta_corrente: contaCorrente.trim(),
        tipo_chave_pix: tipoChavePix,
        chave_pix: chavePix.trim(),
        aceite_termos: aceiteTermos,
      }

      // Verificar se há token de autenticação
      const jsonValue = await AsyncStorage.getItem('infos-user')
      let headers = {}

      if (jsonValue) {
        const userData = JSON.parse(jsonValue)
        if (userData.token) {
          headers = {
            Authorization: `Bearer ${userData.token}`,
          }
        }
      }

      // Chamada à API
      const response = await api.post('/afiliados/cadastrar', dadosAfiliado, { headers })

      // Verificar se a resposta indica sucesso
      if (response.status === 201 || response.status === 200) {
        // Verificar se há erros na resposta mesmo com status 200/201
        if (response.data.success === false || response.data.errors) {
          // Verificar erros de validação
          if (response.data.errors?.email) {
            setErrorEmail(true)
            Toast.show({
              type: 'error',
              text1: response.data.errors.email[0] || 'O campo email já está sendo utilizado.',
            })
            setLoading(false)
            return
          }

          Toast.show({
            type: 'error',
            text1: response.data.message || 'Erro ao cadastrar afiliado',
          })
          setLoading(false)
          return
        }

        Toast.show({
          type: 'success',
          text1: response.data.message || 'Cadastro realizado com sucesso!',
        })

        // Limpar formulário
        setName('')
        setEmail('')
        setTelefone('')
        setPassword('')
        setCpf('')
        setBanco('')
        setAgencia('')
        setContaCorrente('')
        setTipoChavePix('')
        setChavePix('')
        setAceiteTermos(false)

        // Navegar de volta após sucesso
        // navigate('HomeScreen')
      } else {
        Toast.show({
          type: 'error',
          text1: response.data.message || 'Erro ao cadastrar afiliado',
        })
        setLoading(false)
      }

    } catch (error: any) {
      console.error('Erro ao cadastrar afiliado:', error.response?.data)

      // Tratar erros de validação da API - PRIMEIRO verificar email duplicado
      if (error.response?.data?.errors?.email) {
        setErrorEmail(true)
        const emailError = error.response.data.errors.email[0] || 'O campo email já está sendo utilizado.'
        Toast.show({
          type: 'error',
          text1: emailError,
        })
        setLoading(false)
        return
      }

      // Tratar diferentes tipos de erro
      let errorMessage = 'Erro ao cadastrar afiliado'

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message
      } else if (error.response?.data?.erro) {
        errorMessage = error.response.data.erro
      } else if (error.message) {
        errorMessage = error.message
      }

      Toast.show({
        type: 'error',
        text1: errorMessage,
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Limpar erros quando o campo for preenchido
    if (name) setErrorName(false)
    if (email && validateEmail(email)) setErrorEmail(false)
    if (telefone && validatePhone(telefone)) setErrorTelefone(false)
    if (password && validatePassword(password)) setErrorPassword(false)
    if (cpf && validateCPF(cpf)) setErrorCpf(false)
    if (banco) setErrorBanco(false)
    if (agencia) setErrorAgencia(false)
    if (contaCorrente) setErrorContaCorrente(false)
    if (tipoChavePix) setErrorTipoChavePix(false)
    if (chavePix) setErrorChavePix(false)
    if (aceiteTermos) setErrorAceiteTermos(false)
  }, [name, email, telefone, password, cpf, banco, agencia, contaCorrente, tipoChavePix, chavePix, aceiteTermos])

  return (
    <MainLayoutAutenticado notScroll={false} loading={loading} marginTop={24} marginHorizontal={16}>
      <View className='mb-6'>
        <H3>Cadastro de Afiliado</H3>
        <Caption fontSize={14} color={colors.gray} margintop={8}>
          Preencha todos os campos para cadastrar um novo afiliado
        </Caption>
      </View>

      {/* Campos do formulário */}
      <InputOutlined
        mt={8}
        required
        label="Nome completo"
        value={name}
        error={errorName}
        refInput={input1Ref}
        keyboardType={'default'}
        onChange={(text: string) => setName(text)}
        onSubmitEditing={() => focusNextInput(input2Ref)}
      />

      <InputOutlined
        mt={8}
        required
        label="Email"
        value={email}
        error={errorEmail}
        refInput={input2Ref}
        keyboardType={'email-address'}
        onChange={(text: string) => setEmail(text)}
        onSubmitEditing={() => focusNextInput(input3Ref)}
      />

      <InputMascaraPaper
        mt={8}
        required
        label="Telefone"
        value={telefone}
        error={errorTelefone}
        refInput={input3Ref}
        keyboardType={'phone-pad'}
        maxLength={15}
        onChangeText={handlePhoneMask}
        onSubmitEditing={() => focusNextInput(input4Ref)}
      />

      <InputMascaraPaper
        mt={8}
        required
        label="CPF"
        value={cpf}
        error={errorCpf}
        refInput={input5Ref}
        keyboardType={'number-pad'}
        maxLength={14}
        onChangeText={handleCPFMask}
        onSubmitEditing={() => focusNextInput(input6Ref)}
      />

      <InputOutlined
        mt={8}
        required
        label="Banco"
        value={banco}
        error={errorBanco}
        refInput={input6Ref}
        keyboardType={'default'}
        onChange={(text: string) => setBanco(text)}
        onSubmitEditing={() => focusNextInput(input7Ref)}
      />

      <InputMascaraPaper
        mt={8}
        required
        label="Agência"
        value={agencia}
        error={errorAgencia}
        refInput={input7Ref}
        keyboardType={'number-pad'}
        onChangeText={(text: string) => setAgencia(text)}
        onSubmitEditing={() => focusNextInput(input8Ref)}
      />

      <InputMascaraPaper
        mt={8}
        required
        label="Conta Corrente"
        value={contaCorrente}
        error={errorContaCorrente}
        refInput={input8Ref}
        keyboardType={'number-pad'}
        onChangeText={(text: string) => setContaCorrente(text)}
        onSubmitEditing={() => focusNextInput(input9Ref)}
      />

      <View className='mt-8'>
        <H5>Tipo de Chave PIX*</H5>
        {errorTipoChavePix && (
          <Caption fontSize={12} color={colors.error40} margintop={4}>
            Selecione o tipo de chave PIX
          </Caption>
        )}
        <RadioButton
          options={tiposChavePix}
          selectedOption={tipoChavePix}
          onSelectOption={(option: string) => {
            setTipoChavePix(option)
            setErrorTipoChavePix(false)
          }}
        />
      </View>

      <InputOutlined
        mt={8}
        required
        label="Chave PIX"
        value={chavePix}
        error={errorChavePix}
        refInput={input9Ref}
        keyboardType={tipoChavePix === 'Email' ? 'email-address' : tipoChavePix === 'Telefone' ? 'phone-pad' : 'default'}
        onChange={(text: string) => setChavePix(text)}
        placeholder={tipoChavePix ? `Digite sua ${tipoChavePix}` : 'Digite sua chave PIX'}
      />

      <InputOutlined
        mt={8}
        required
        label="Senha (mínimo 8 caracteres)"
        value={password}
        error={errorPassword}
        refInput={input4Ref}
        secureTextEntry={true}
        keyboardType={'default'}
        onChange={(text: string) => setPassword(text)}
        onSubmitEditing={() => focusNextInput(input5Ref)}
      />

      <View className='flex-row items-center gap-2 mt-6 mb-4'>
        <TouchableOpacity
          onPress={() => {
            const newChecked = !aceiteTermos
            setAceiteTermos(newChecked)
            setErrorAceiteTermos(false)
          }}
        >
          <View
            style={{
              width: 24,
              height: 24,
              borderWidth: 2,
              borderColor: '#000',
              borderRadius: 4,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: aceiteTermos ? '#000' : 'transparent',
            }}
          >
            {aceiteTermos && (
              <Text style={{ color: '#FFF', fontWeight: 'bold' }}>✓</Text>
            )}
          </View>
        </TouchableOpacity>
        <View className='flex-1'>
          <Caption fontSize={14}>
            Aceito os termos e condições*
          </Caption>
          {errorAceiteTermos && (
            <Caption fontSize={12} color={colors.error40} margintop={4}>
              Você deve aceitar os termos para continuar
            </Caption>
          )}
        </View>
      </View>

      <View className='mb-8'>
        <FilledButton
          title="Cadastrar Afiliado"
          onPress={handleSubmit}
          disabled={loading}
        />
      </View>
    </MainLayoutAutenticado>
  )
}
