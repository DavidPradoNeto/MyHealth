import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native'

import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../config/firebase'


const icon = require('../src/images/vaccine-icon.png')
const Recuperar = (props) => {

    const [email, setEmail] = useState()


    const recuperaSenha = () => {
        sendPasswordResetEmail(auth, email)
        .then(() => {
            console.log('Email de redefinição enviado com sucesso!')
            props.navigation.pop()
        })
        .catch(() => {
            console.log('Erro ao solicitar a redefinição de senha')
        })
    }

    const voltar = () => {
        props.navigation.pop()
    }


    return (
        <View style={{ backgroundColor: '#ADD4D0', height: '100%' }}>
            <View style={styles.header}>
                <Image
                    style={styles.image}
                    source={icon}
                />
                <Text style={styles.appName}>MyHealth</Text>
            </View>

            <View style={{alignItems: 'center', marginVertical: '30%'}}>
                <View style={styles.input}>
                    <Text style={styles.texto}>E-mail</Text>
                    <TextInput style={styles.textInput} value={email} onChangeText={setEmail} keyboardType='email-address' />
                </View>

                <TouchableOpacity style={styles.botao} onPress={recuperaSenha}>
                    <Text style={styles.texto}>Recuperar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.botaoCancela} onPress={voltar}>
                    <Text style={styles.texto}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    botao: {
        backgroundColor: '#49B976',
        borderColor: '#37BD6D',
        borderStyle: 'solid',
        borderWidth: 1,
        width: 188,
        height: 50,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 50,
        elevation: 4,
        shadowColor: '#000000'
    },
    botaoCancela: {
        backgroundColor: '#FF8383',
        borderColor: '#FF8383',
        borderStyle: 'solid',
        borderWidth: 1,
        width: 188,
        height: 50,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 200,
        elevation: 4,
        shadowColor: '#000000',
    },
    header: {
        backgroundColor: '#C1E7E3',
        width: '100%',
        height: 87,
        flexDirection: 'row'
    },
    image: {
        width: 51,
        margin: 18
    },
    appName: {
        fontFamily: 'AveriaLibre-Bold',
        color: '#419ED7',
        fontSize: 48,
        textAlignVertical: 'center'
    },
    input: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: '2%',
        marginRight: 20
    },
    texto: {
        fontFamily: 'AveriaLibre-Regular',
        fontSize: 16,
        color: 'white'
    },
    textInput: {
        fontFamily: 'AveriaLibre-Regular',
        fontSize: 18,
        color: '#419ED7',
        padding: 5,
        backgroundColor: 'white',
        borderStyle: 'solid',
        width: 250,
        height: 26,
        left: 10
    }
})

export default Recuperar