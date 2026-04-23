import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useRoute } from '@react-navigation/native'
import QRCode from 'react-native-qrcode-svg'
import MainLayoutAutenticado from '../../components/layout/MainLayoutAutenticado'
import Caption from '../../components/typography/Caption'
import H5 from '../../components/typography/H5'
import { colors } from '../../styles/colors'

function formatValor(valor: unknown) {
    if (valor == null) return 'Não informado'
    if (typeof valor === 'string' && valor.trim() === '') return 'Não informado'
    return String(valor)
}

function InfoLinha({
    label,
    valor,
}: {
    label: string
    valor: unknown
}) {
    return (
        <View style={styles.infoLinha}>
            <Caption fontSize={12} color={colors.neutralvariant60}>
                {label}
            </Caption>
            <Caption fontSize={15} margintop={4} color={colors.neutral10}>
                {formatValor(valor)}
            </Caption>
        </View>
    )
}

export default function DiscotokenQrCodeScreen() {
    const route = useRoute<any>()
    const cupom = route?.params?.cupom ?? {}
    const anunciante = cupom?.anunciante ?? {}
    const usuarioCliente = route?.params?.usuarioCliente ?? 0
    // ID do anunciante, ID do cliente (separado por vírgula e sem espaços)
    const valorQrCode = `${anunciante?.user_id ?? ''},${usuarioCliente ?? ''}`

    return (
        <MainLayoutAutenticado marginHorizontal={16}>
            <View style={styles.container}>
                <H5 color={colors.primary40}>QR Code Discontoken</H5>

                <View style={styles.qrBox}>
                    <QRCode value={String(valorQrCode)} size={220} />
                </View>

                <InfoLinha label="ID do Anunciante" valor={anunciante?.user_id ?? ''} />
                <InfoLinha label="ID do Cliente" valor={usuarioCliente ?? ''} />

                <InfoLinha label="Nome fantasia" valor={anunciante?.nome_fantasia ?? cupom?.name} />
                {anunciante?.vantagem_porcentagem_discotoken &&
                    <InfoLinha label="Vantagem (%)" valor={`${anunciante?.vantagem_porcentagem_discotoken}%`} />
                }
                {anunciante?.vantagem_reais_discotoken &&
                    <InfoLinha label="Vantagem (R$)" valor={`R$ ${anunciante?.vantagem_reais_discotoken}`} />
                }
                <InfoLinha label="CNPJ" valor={anunciante?.cnpj} />
                <InfoLinha label="E-mail" valor={anunciante?.email ?? cupom?.email} />
                <InfoLinha label="Endereço" valor={anunciante?.endereco} />
                <InfoLinha label="Cidade / Estado" valor={`${formatValor(anunciante?.cidade ?? cupom?.cidade)} / ${formatValor(anunciante?.estado ?? cupom?.estado)}`} />
            </View>
        </MainLayoutAutenticado>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 72,
        paddingBottom: 24,
    },
    qrBox: {
        marginTop: 16,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.neutral99,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.neutralvariant90,
        paddingVertical: 20,
    },
    infoLinha: {
        marginTop: 10,
        paddingBottom: 8,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.neutralvariant90,
    },
})
