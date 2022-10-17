import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable, TextInput, Modal } from 'react-native'
import { createDrawerNavigator } from "@react-navigation/drawer"
import { TextInputMask } from 'react-native-masked-text'
import DatePicker from 'react-native-date-picker'
import { RadioButton } from 'react-native-paper'

import { launchImageLibrary } from 'react-native-image-picker';

const Drawer = createDrawerNavigator()

const icon = require('../src/images/vaccine-icon.png')
const menuIcon = require('../src/images/drawer_icon.png')

const EditarVacina = (props) => {


    const { item } = props.route.params

    const excluir = () => {
        props.navigation.pop()
    }

    const [modalVisible, setModalVisible] = useState(false)
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [dataVacina, setDataVacina] = useState()

    const [vacina, setVacina] = useState()


    const [dose, setChecked] = useState('1a. dose')

    const [dateProx, setDateProx] = useState(new Date())
    const [openProx, setOpenProx] = useState(false)
    const [dataProxVacina, setDataProxVacina] = useState()

    const [uri, setUri] = useState('')

    const openImagePicker = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            setUri(response.assets[0].uri)
        })
    }

    useEffect(() => {
        setDataVacina(item.data)
        setVacina(item.vacina)
        setChecked(item.dose)
        setUri(item.urlImage)
        setDataProxVacina(item.proximaVacina)
    }, []);


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
                                setDataVacina(tempDate[2] + tempDate[1] + tempDate[0])
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
                                setDataProxVacina(tempDate[2] + tempDate[1] + tempDate[0])
                            }}
                            onCancel={() => {
                                setOpen(false)
                            }}
                        />
                    </Pressable>


                </View>
                <TouchableOpacity style={styles.botao} onPress={()=>{alert('nao implementado'); props.navigation.pop()}}>
                    <Text style={styles.texto}>Salvar alterações</Text>
                </TouchableOpacity>


                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: 'black', opacity: 0.5}}/>
                        <View style={{ alignSelf: 'center', top: '40%', backgroundColor: 'white', elevation: 4, width: 300, height: 150, flexDirection: 'column' }}>
                            <Text style={{ color: '#FF8383', fontFamily: 'AveriaLibre-Regular', fontSize: 20, textAlign: 'center', width: 250, alignSelf: 'center', top: '15%' }}>Tem certeza que deseja remover essa vacina?</Text>
                            <View style={{flexDirection: 'row', alignSelf: 'center', top: 40}}>
                                <Pressable
                                    style={{marginHorizontal: '2%', backgroundColor: '#FF8383', width: 120, height: 40, alignItems: 'center'}}
                                    onPress={excluir}
                                >
                                    <Text style={{fontSize: 25, fontFamily: 'AveriaLibre-Regular', color: 'white', padding: 5}}>SIM</Text>
                                </Pressable>
                                <Pressable
                                    style={{marginHorizontal: '2%', backgroundColor: '#419ED7', width: 120, height: 40, alignItems: 'center'}}
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <Text style={{fontSize: 25, fontFamily: 'AveriaLibre-Regular', color: 'white', padding: 5}}>CANCELAR</Text>
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
        </View>
    )
}

const styles = StyleSheet.create({
    botaoCancela: {
        flexDirection: 'row',
        backgroundColor: '#FF8383',
        borderColor: '#FF8383',
        borderStyle: 'solid',
        borderWidth: 1,
        width: 110,
        height: 40,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 50,
        elevation: 4,
        shadowColor: '#000000',
    },
    image: {
        width: 32,
        height: 32,
        alignSelf: 'center',
        marginHorizontal: 20
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
        fontSize: 16,
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
        marginTop: 50,
        elevation: 4,
        shadowColor: '#000000'
    },
    textInput: {
        fontFamily: 'AveriaLibre-Regular',
        fontSize: 16,
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

export default EditarVacina