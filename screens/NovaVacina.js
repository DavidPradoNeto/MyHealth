import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable, TextInput, Modal } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import DatePicker from 'react-native-date-picker'
import { RadioButton } from 'react-native-paper'

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../config/firebase'

const NovaVacina = (props) => {



    const [modalVisible, setModalVisible] = useState(false)
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [dataVacina, setDataVacina] = useState()

    const [vacina, setVacina] = useState()


    const [dose, setChecked] = useState('1a. dose')

    const [dateProx, setDateProx] = useState(new Date())
    const [openProx, setOpenProx] = useState(false)
    const [dataProxVacina, setDataProxVacina] = useState('')
    const [data, setData] = useState('')
    const [dataProx, setDataProx] = useState('')

    const [uri, setUri] = useState('')


    const [atualizando, setAtualizando] = useState(false)


    useEffect(() => {
        if (props.route.params?.id) {
            setAtualizando(true)

            getDoc(doc(db, 'usuarios', auth.currentUser.email, "vacinas", props.route.params.id))
                .then((result) => {
                    setVacina(result.data().vacina)
                    setDataVacina(result.data().data)
                    setChecked(result.data().dose)
                    setUri(result.data().urlImage)
                    setDataProxVacina(result.data().proximaVacina)
                })
                .catch((error) => {
                    alert(error)
                })
        }
    }, [])

    useEffect(() => {
        setData(dataVacina)
    }, [dataVacina])

    useEffect(() => {
        setDataProx(dataProxVacina)
    }, [dataProxVacina])


    const openImagePicker = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if(response.assets)
            setUri(response.assets[0].uri)
        })

        // launchCamera({ mediaType: 'photo' }, (response) => {
        //     if(response.assets)
        //     setUri(response.assets[0].uri)
        // })
    }

    const salvarVacina = () => {
        // Garantir que Proxima vacinação estará "vazio" caso selecione dose unica
        if (dose === 'Dose única')
            setDataProx('')

        if (vacina) {
            addDoc(collection(doc(db, "usuarios", auth.currentUser.email), "vacinas"), {
                vacina: vacina,
                data: data,
                dose: dose,
                urlImage: uri,
                proximaVacina: dataProx
            })
                .then((result) => {
                    console.log("Vacina Cadastrada")
                    props.navigation.pop()
                })
                .catch((error) => console.log(error.message))
        }
    }

    const atualizaVacina = () => {
        updateDoc(doc(db, 'usuarios', auth.currentUser.email, "vacinas", props.route.params.id), {
            vacina: vacina,
            data: data,
            dose: dose,
            urlImage: uri,
            proximaVacina: dataProx
        })
        .then((result) => {
            props.navigation.pop()
        })
        .catch((error) => {
            alert(error)
        })
    }

    const excluirVacina = () => {
        deleteDoc(doc(db, 'usuarios', auth.currentUser.email, "vacinas", props.route.params.id))
        .then(() => {
            props.navigation.pop()
        })
        .catch((error) => {
            alert(error)
        })
    }


    return (

        <View style={{ backgroundColor: '#ADD4D0', height: '100%' }}>

            <View style={{ marginLeft: '5%', marginTop: 40 }}>
                <View style={styles.input}>
                    <Text style={styles.texto}>Data de vacinação</Text>
                    <Pressable style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => setOpen(true)} >
                        <TextInputMask
                            type={'datetime'}
                            options={{
                                format: 'DD/MM/YYYY'
                            }}
                            value={dataVacina}
                            style={styles.dateInput}
                            onChangeText={setDataVacina}

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
                                tempDate[0] = tempDate[0].split('"').splice(1, 1)[0]
                                setDataVacina(tempDate[2] + tempDate[1] + tempDate[0])
                                setData(tempDate[2] + '/' + tempDate[1] + '/' + tempDate[0])
                            }}
                            onCancel={() => {
                                setOpen(false)
                            }}
                        />
                    </Pressable>


                </View>

                <View style={styles.input}>
                    <Text style={styles.texto}>Vacina</Text>
                    <TextInput style={styles.textInput} value={vacina} onChangeText={setVacina} />
                </View>

                <View style={{ flexDirection: 'column', alignItems: 'center', marginLeft: 50 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', left: 10 }}>
                        <Text style={styles.texto}>Dose</Text>
                        <RadioButton
                            value="1a. dose"
                            status={dose === '1a. dose' ? 'checked' : 'unchecked'}
                            uncheckedColor='#FFFFFF'
                            color='#419ED7'
                            onPress={() => setChecked('1a. dose')}
                        />
                        <Text style={styles.textoSmall} >1a. dose</Text>
                        <RadioButton
                            value="2a. dose"
                            uncheckedColor='#FFFFFF'
                            color='#419ED7'
                            status={dose === '2a. dose' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('2a. dose')}
                        />
                        <Text style={styles.textoSmall}>2a. dose</Text>
                        <RadioButton
                            value="3a. dose"
                            uncheckedColor='#FFFFFF'
                            color='#419ED7'
                            status={dose === '3a. dose' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('3a. dose')}
                        />
                        <Text style={styles.textoSmall}>3a. dose</Text>

                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', left: 10, alignSelf: 'baseline', left: 68 }}>
                        <RadioButton
                            value="Dose única"
                            uncheckedColor='#FFFFFF'
                            color='#419ED7'
                            status={dose === 'Dose única' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('Dose única')}
                        />
                        <Text style={styles.textoSmall}>Dose única</Text>
                    </View>
                </View>

                <View style={styles.input}>
                    <Text style={styles.texto}>Comprovante</Text>

                    <TouchableOpacity style={{ backgroundColor: '#419ED7', alignItems: 'center', width: 140, height: 20, left: 10, marginRight: 68 }} onPress={openImagePicker}>
                        <Text style={styles.textoSmall}>Selecionar imagem...</Text>
                    </TouchableOpacity>

                </View>

                {uri ?
                    <Image source={{ uri: uri }} style={{ width: 200, height: 100, marginLeft: 143 }} />
                    :
                    <Image style={{ width: 200, height: 100, marginLeft: 143, borderColor: 'green', borderWidth: 1 }} />
                }
                {dose === 'Dose única' ?
                    null
                    :
                    <View style={styles.input}>
                        <Text style={styles.texto}>Proxima vacinação</Text>
                        <Pressable style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => setOpenProx(true)} >
                            <TextInputMask
                                type={'datetime'}
                                options={{
                                    format: 'DD/MM/YYYY'
                                }}
                                value={dataProxVacina}
                                style={styles.dateInput}
                                onChangeText={setDataProxVacina}

                            />
                            <Image
                                style={{ left: -30, width: 23, height: 23, tintColor: 'gray' }}
                                source={require('../src/images/calendar.png')}
                            />
                            <DatePicker
                                modal
                                locale='pt_BR'
                                mode='date'
                                open={openProx}
                                date={dateProx}
                                onConfirm={(dateProx) => {
                                    setOpenProx(false)
                                    var tempDate = JSON.stringify(dateProx).split('T')[0]
                                    tempDate = tempDate.split('-')
                                    tempDate[0] = tempDate[0].split('"').splice(1, 1)[0]
                                    setDataProxVacina(tempDate[2] + tempDate[1] + tempDate[0])
                                    setDataProx(tempDate[2] + '/' + tempDate[1] + '/' + tempDate[0])
                                }}
                                onCancel={() => {
                                    setOpen(false)
                                }}
                            />
                        </Pressable>



                    </View>
                }
            </View>

            <View style={{ bottom: 100, position: 'absolute', alignSelf: 'center' }}>
            {atualizando ?
                    <View>
                        <TouchableOpacity style={styles.botao} onPress={atualizaVacina} >
                            <Text style={styles.texto}>Atualizar</Text>
                        </TouchableOpacity>

                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <View style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'black', opacity: 0.5 }} />
                            <View style={{ alignSelf: 'center', top: '40%', backgroundColor: 'white', elevation: 4, width: 300, height: 150, flexDirection: 'column' }}>
                                <Text style={{ color: '#FF8383', fontFamily: 'AveriaLibre-Regular', fontSize: 20, textAlign: 'center', width: 250, alignSelf: 'center', top: '15%' }}>Tem certeza que deseja remover essa vacina?</Text>
                                <View style={{ flexDirection: 'row', alignSelf: 'center', top: 40 }}>
                                    <Pressable
                                        style={{ marginHorizontal: '2%', backgroundColor: '#FF8383', width: 120, height: 40, alignItems: 'center' }}
                                        onPress={excluirVacina}
                                    >
                                        <Text style={{ fontSize: 25, fontFamily: 'AveriaLibre-Regular', color: 'white', padding: 5 }}>SIM</Text>
                                    </Pressable>
                                    <Pressable
                                        style={{ marginHorizontal: '2%', backgroundColor: '#419ED7', width: 120, height: 40, alignItems: 'center' }}
                                        onPress={() => setModalVisible(!modalVisible)}
                                    >
                                        <Text style={{ fontSize: 25, fontFamily: 'AveriaLibre-Regular', color: 'white', padding: 5 }}>CANCELAR</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </Modal>


                        <TouchableOpacity style={styles.botaoCancela} onPress={() => (setModalVisible(true))}>
                            <Image
                                style={{ width: 23, height: 23, marginRight: 5 }}
                                source={require('../src/images/lixeira.png')}
                            />
                            <Text style={styles.texto}>Excluir</Text>
                        </TouchableOpacity>

                    </View>
                    :
                    <>
                        <TouchableOpacity style={styles.botao} onPress={salvarVacina} >
                            <Text style={styles.texto}>Cadastrar</Text>
                        </TouchableOpacity>


                        <TouchableOpacity style={styles.botaoCancela} onPress={() => props.navigation.pop()}>
                            <Text style={styles.texto}>Cancelar</Text>
                        </TouchableOpacity>
                    </>

                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#C1E7E3',
        width: '100%',
        height: 50,
        flexDirection: 'row'
    },
    image: {
        width: 32,
        height: 32,
        alignSelf: 'center',
        marginHorizontal: 20
    },
    appName: {
        fontFamily: 'AveriaLibre-Bold',
        color: '#419ED7',
        fontSize: 32,
        textAlignVertical: 'center'
    },
    texto: {
        fontFamily: 'AveriaLibre-Regular',
        fontSize: 16,
        color: 'white'
    },
    textoSmall: {
        fontFamily: 'AveriaLibre-Regular',
        fontSize: 14,
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
    input: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: '2%',
        marginRight: 40,
        alignSelf: 'flex-end'
    },
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
        elevation: 4,
        shadowColor: '#000000'
    },
    botaoCancela: {
        backgroundColor: '#FF8383',
        borderColor: '#FF8383',
        borderStyle: 'solid',
        borderWidth: 1,
        width: 100,
        height: 50,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 30,
        elevation: 4,
        shadowColor: '#000000'
    },
    textInput: {
        fontFamily: 'AveriaLibre-Regular',
        fontSize: 18,
        color: '#419ED7',
        padding: 5,
        backgroundColor: 'white',
        borderStyle: 'solid',
        width: 200,
        height: 26,
        left: 10,
        marginRight: 8
    }
})

export default NovaVacina