import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Modal, Linking } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import DatePicker from 'react-native-date-picker'
import { RadioButton } from 'react-native-paper'

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore'
import { auth, db, storage } from '../config/firebase'
import { uploadBytes, ref, getDownloadURL, deleteObject } from "firebase/storage"
import Loader from '../components/Loader'
import Geolocation from '@react-native-community/geolocation'
import MapView, { Marker } from 'react-native-maps'

const NovaVacina = (props) => {



    const [loader, setLoader] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)
    const [modalImagemVisible, setModalImagem] = useState(false)
    const [modalMapVisible, setModalMapVisible] = useState(false)

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
    const [pathFoto, setPathFoto] = useState(null)


    const [atualizando, setAtualizando] = useState(false)


    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)

    const getLocation = () => {
        Geolocation.getCurrentPosition((position) => {
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
        })
    }

    const touchOnMap = (e) => {
        setLatitude(e.nativeEvent.coordinate.latitude)
        setLongitude(e.nativeEvent.coordinate.longitude)
    }



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
                    setPathFoto(result.data().pathFoto)
                    setLatitude(result.data().geolocation.latitude)
                    setLongitude(result.data().geolocation.longitude)
                    setLoader(false)
                })
                .catch((error) => {
                    alert(error)
                })
        }else{
            getLocation()
        }
        setLoader(false)
    }, [])

    useEffect(() => {
        setData(dataVacina)
    }, [dataVacina])

    useEffect(() => {
        setDataProx(dataProxVacina)
    }, [dataProxVacina])


    const openImagePicker = () => {
        launchImageLibrary()
            .then((result) => {
                if (result.assets)
                    setUri(result.assets[0].uri)

                setModalImagem(!modalImagemVisible)
            })
            .catch((error) => alert(error))
    }

    const openCamera = () => {
        launchCamera()
            .then((result) => {
                if (result.assets)
                    setUri(result.assets[0].uri)

                setModalImagem(!modalImagemVisible)
            })
            .catch((error) => alert(error))
    }

    const salvarVacina = async () => {
        // Garantir que Proxima vacinação estará "vazio" caso selecione dose unica
        if (dose === 'Dose única')
            setDataProx('')

        if (!vacina)
            return



        setLoader(true)
        const dadosFoto = await fetch(uri)
        const blob = await dadosFoto.blob()

        const arrayString = uri.split("-")
        const lastIndex = arrayString.length - 1;

        const filename = "images/" + arrayString[lastIndex]

        uploadBytes(ref(storage, filename), blob)
            .then((result) => {
                getDownloadURL(ref(storage, filename))
                    .then((url) => {
                        addDoc(collection(doc(db, "usuarios", auth.currentUser.email), "vacinas"), {
                            vacina: vacina,
                            data: data,
                            dose: dose,
                            urlImage: url,
                            proximaVacina: dataProx,
                            pathFoto: filename,
                            geolocation: {
                                latitude: latitude,
                                longitude: longitude
                            }
                        })
                            .then((result) => {
                                console.log("Vacina Cadastrada")
                                props.navigation.pop()
                            })
                            .catch((error) => {
                                alert(error)
                            })
                    })
                    .catch((error) => {
                        alert(error)
                    })
            })
            .catch((error) => {
                alert(error)
            })

    }

    const atualizaVacina = async () => {
        // Garantir que Proxima vacinação estará "vazio" caso selecione dose unica
        if (dose === 'Dose única')
            setDataProx('')

        if (vacina) {

            setLoader(true)
            const dadosFoto = await fetch(uri)
            const blob = await dadosFoto.blob()

            uploadBytes(ref(storage, pathFoto), blob)
                .then((result) => {
                    updateDoc(doc(db, 'usuarios', auth.currentUser.email, "vacinas", props.route.params.id), {
                        vacina: vacina,
                        data: data,
                        dose: dose,
                        urlImage: uri,
                        proximaVacina: dataProx,
                        pathFoto: pathFoto,
                        geolocation: {
                            latitude: latitude,
                            longitude: longitude
                        }
                    })
                        .then((result) => {
                            props.navigation.pop()
                        })
                        .catch((error) => {
                            alert(error)
                        })
                })
                .catch((error) => alert(error))
        }
    }


    const excluirVacina = () => {

        setLoader(true)
        deleteObject(ref(storage, pathFoto))
            .then(() => {
                deleteDoc(doc(db, 'usuarios', auth.currentUser.email, "vacinas", props.route.params.id))
                    .then(() => {
                        props.navigation.pop()
                    })
                    .catch((error) => {
                        alert(error)
                    })
            })
    }


    return (

        <View style={{ backgroundColor: '#ADD4D0', height: '100%' }}>

            <View style={{ marginLeft: '5%', marginTop: 40 }}>
                <View style={styles.input}>
                    <Text style={styles.texto}>Data de vacinação</Text>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => setOpen(true)} >
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
                    </TouchableOpacity>


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

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalImagemVisible}
                    onRequestClose={() => {
                        setModalImagem(!modalImagemVisible);
                    }}
                >

                    <View style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'black', opacity: 0.5 }} />
                    <View style={{ alignSelf: 'center', top: '40%', backgroundColor: 'white', elevation: 4, width: 400, height: 140, flexDirection: 'column' }}>
                        <Text style={{ color: '#419ED7', fontFamily: 'AveriaLibre-Regular', fontSize: 20, textAlign: 'center', width: 250, alignSelf: 'center', top: '15%' }}>Selecione o metodo de captura de imagem.</Text>
                        <View style={{ flexDirection: 'row', alignSelf: 'center', top: 40 }}>
                            <TouchableOpacity
                                style={{ backgroundColor: '#419ED7', marginHorizontal: '2%', width: 120, height: 40, alignItems: 'center' }}
                                onPress={openImagePicker}
                            >
                                <Text style={{ fontSize: 25, fontFamily: 'AveriaLibre-Regular', color: 'white', padding: 5 }}>Galeria</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ backgroundColor: '#419ED7', marginHorizontal: '2%', width: 120, height: 40, alignItems: 'center' }}
                                onPress={openCamera}
                            >
                                <Text style={{ fontSize: 25, fontFamily: 'AveriaLibre-Regular', color: 'white', padding: 5 }}>Camera</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ marginHorizontal: '2%', backgroundColor: '#419ED7', width: 120, height: 40, alignItems: 'center' }}
                                onPress={() => setModalImagem(!modalImagemVisible)}
                            >
                                <Text style={{ fontSize: 25, fontFamily: 'AveriaLibre-Regular', color: 'white', padding: 5 }}>Voltar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>



                </Modal>

                <View style={styles.input}>
                    <Text style={styles.texto}>Comprovante</Text>

                    <TouchableOpacity style={{ backgroundColor: '#419ED7', alignItems: 'center', width: 140, height: 20, left: 10, marginRight: 68 }} onPress={() => setModalImagem(!modalImagemVisible)}>
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
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => setOpenProx(true)} >
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
                        </TouchableOpacity>



                    </View>
                }

                {/* GEOLOCALIZAÇÃO  */}

                <View>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', marginHorizontal: '20%', marginTop: 10 }}
                        onPress={() => { setModalMapVisible(true) }}>
                        <Text style={styles.texto}>Adicionar localização</Text>
                        <Image source={require('../src/images/map-pointer.png')}
                            style={{ left: 5, width: 23, height: 23, tintColor: '#419ED7' }} />
                    </TouchableOpacity>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalMapVisible}
                        onRequestClose={() => {
                            setModalMapVisible(!modalMapVisible);
                        }}
                    >
                        <View style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'black', opacity: 0.5 }} />

                        <View style={{ margin: 10, height: "80%", width: "90%", alignSelf: 'center' }}>



                            <MapView
                                onPress={(e) => touchOnMap(e)}
                                loadingEnabled={true}
                                region={{
                                    latitude: latitude,
                                    longitude: longitude,
                                    latitudeDelta: 0.01,
                                    longitudeDelta: 0.01
                                }}
                                style={{ flex: 1 }}
                            >
                                <Marker
                                    coordinate={{ latitude: latitude, longitude: longitude }}
                                    pinColor={"blue"}
                                />
                            </MapView>


                            <TouchableOpacity
                                style={{ top: 15, alignSelf: 'center', backgroundColor: '#FF8383', width: 120, height: 40, alignItems: 'center' }}
                                onPress={() => setModalMapVisible(!modalMapVisible)}
                            >
                                <Text style={{ fontSize: 25, fontFamily: 'AveriaLibre-Regular', color: 'white', padding: 5 }}>Voltar</Text>
                            </TouchableOpacity>

                        </View>
                    </Modal>
                </View>
            </View>
            {loader ?
                <Loader />
                :
                null}
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
                                    <TouchableOpacity
                                        style={{ marginHorizontal: '2%', backgroundColor: '#FF8383', width: 120, height: 40, alignItems: 'center' }}
                                        onPress={excluirVacina}
                                    >
                                        <Text style={{ fontSize: 25, fontFamily: 'AveriaLibre-Regular', color: 'white', padding: 5 }}>SIM</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{ marginHorizontal: '2%', backgroundColor: '#419ED7', width: 120, height: 40, alignItems: 'center' }}
                                        onPress={() => setModalVisible(!modalVisible)}
                                    >
                                        <Text style={{ fontSize: 25, fontFamily: 'AveriaLibre-Regular', color: 'white', padding: 5 }}>CANCELAR</Text>
                                    </TouchableOpacity>
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