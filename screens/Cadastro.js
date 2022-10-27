import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Pressable } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'

import DatePicker from 'react-native-date-picker'

import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../config/firebase'

import { RadioButton } from 'react-native-paper';
import { doc, setDoc } from 'firebase/firestore'
import Loader from '../components/Loader'

const icon = require('../src/images/vaccine-icon.png')
const Cadastro = (props) => {

    const [nome, setNome] = useState()
    const [nascimento, setNascimento] = useState()
    const [email, setEmail] = useState()
    const [senha, setSenha] = useState('')
    const [repeteSenha, setRepeteSenha] = useState('')

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    const [sexo, setChecked] = useState('masculino')

    const [validaSenha, setValidaSenha] = useState(0)
    const [borda, setBorderRed] = useState(0)

    const [loader, setLoader] = useState(false)

    useEffect(() => {
        if (senha != repeteSenha) {
            setValidaSenha(1)
            setBorderRed(1)
            return
        } else {
            setValidaSenha(0)
            setBorderRed(0)
        }
    }, [repeteSenha, senha])


    const criarUsuario = () => {
        if (!nome || !sexo || !nascimento || !email || !senha || !repeteSenha || senha.length < 6) {
            console.log("Preencha todos os campos")
        }
        else {
            if (!validaSenha) {
                setLoader(true)

                
                createUserWithEmailAndPassword(auth, email, senha)
                    .then((userCredential) => {
                        setDoc(doc(db, "usuarios", userCredential.user.email), {
                            nome: nome,
                            sexo: sexo,
                            dataNascimento: nascimento,
                            email: email
                        })
                            .then((result) => {
                                console.log("Dados armazenados na database com sucesso")
                            })
                            .catch((error) => {
                                console.log("Erro ao salvar dados. " + error)
                            })
                        props.navigation.pop()
                    })
                    .catch((error) => {
                        console.log("Ocorreu um erro ao cadastrar usuário")
                        console.log("Erro: " + error.message)
                    })


            }
        }

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
            <View style={{ alignItems: 'flex-end', marginVertical: 50 }}>
                <View style={styles.input}>
                    <Text style={styles.texto}>Nome completo</Text>
                    <TextInput style={styles.textInput} value={nome} onChangeText={setNome} />
                </View>

                <View style={{ flexDirection: 'row', left: 90, alignItems: 'center', marginRight: 150 }}>
                    <Text style={styles.texto}>Sexo</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', left: 10 }}>
                        <RadioButton
                            value="masculino"
                            status={sexo === 'masculino' ? 'checked' : 'unchecked'}
                            uncheckedColor='#FFFFFF'
                            color='#419ED7'
                            theme={{ roundness: 1 }}
                            onPress={() => setChecked('masculino')}
                        />
                        <Text style={styles.texto} >Masculino</Text>
                        <RadioButton
                            value="feminino"
                            uncheckedColor='#FFFFFF'
                            color='#419ED7'
                            status={sexo === 'feminino' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('feminino')}
                        />

                        <Text style={styles.texto}>Feminino</Text>
                    </View>
                </View>

                <View style={styles.input}>
                    <Text style={styles.texto}>Data nascimento</Text>
                    <Pressable style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => setOpen(true)} >
                        <TextInputMask
                            type={'datetime'}
                            options={{
                                format: 'DD/MM/YYYY'
                            }}
                            value={nascimento}
                            style={styles.dateInput}
                            onChangeText={setNascimento}

                        />
                        <Image
                            style={{ left: -30, width: 23, height: 23, tintColor: 'gray' }}
                            source={require('../src/images/calendar.png')}
                        />
                        <DatePicker
                            modal
                            locale='pt_BR'
                            mode='date'
                            open={open}
                            date={date}
                            onConfirm={(date) => {
                                setOpen(false)
                                var tempDate = JSON.stringify(date).split('T')[0]
                                tempDate = tempDate.split('-')
                                setNascimento(tempDate[2] + tempDate[1] + tempDate[0])
                            }}
                            onCancel={() => {
                                setOpen(false)
                            }}
                        />
                    </Pressable>


                </View>

                <View style={styles.input}>
                    <Text style={styles.texto}>E-mail</Text>
                    <TextInput style={styles.textInput} value={email} onChangeText={setEmail} keyboardType='email-address' />
                </View>

                <View style={styles.input}>
                    <Text style={styles.texto}>Senha</Text>
                    <TextInput style={styles.textInput} value={senha} secureTextEntry={true} onChangeText={setSenha} textContentType='newPassword' />
                </View>

                <View style={styles.input}>
                    <Text style={styles.texto}>Repetir Senha</Text>
                    <TextInput style={{
                        fontFamily: 'AveriaLibre-Regular',
                        fontSize: 18,
                        color: '#419ED7',
                        padding: 5,
                        backgroundColor: 'white',
                        borderStyle: 'solid',
                        width: 250,
                        height: 26,
                        left: 10,
                        borderWidth: borda,
                        borderColor: 'red'
                    }} value={repeteSenha} secureTextEntry={true} onChangeText={setRepeteSenha} />

                </View>
                <Text style={{
                    color: '#FD7979',
                    fontFamily: 'AveriaLibre-Regular',
                    alignSelf: 'flex-start',
                    left: 140,
                    opacity: validaSenha
                }}>Senha não confere!</Text>
                {
                    loader
                        ?
                        <Loader />
                        :
                        null
                }
                <TouchableOpacity style={styles.botao} onPress={criarUsuario}>
                    <Text style={styles.texto}>Cadastrar</Text>
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
        marginTop: 50,
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
    dateInput: {
        fontFamily: 'AveriaLibre-Regular',
        fontSize: 20,
        color: '#419ED7',
        padding: 5,
        backgroundColor: 'white',
        borderStyle: 'solid',
        width: 180,
        height: 30,
        left: 5
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

export default Cadastro