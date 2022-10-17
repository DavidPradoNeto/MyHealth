import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, FlatList } from 'react-native'
import CardVacina from '../components/CardVacina'
import listaVacinas from '../assets/listaVacinas'

const MinhasVacinas = (props) => {

    const NovaVacina = () => {
        props.navigation.push('Nova Vacina')
    }


    return (

        <View style={{ backgroundColor: '#ADD4D0', height: '100%' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginVertical: '5%' }}>
                <TextInput style={{ backgroundColor: 'white', width: '90%', height: 40, alignItems: 'center', paddingHorizontal: 40, fontSize: 18, paddingVertical: 0, fontFamily: 'AveriaLibre-Bold' }} placeholder={'PESQUISAR VACINA'} />
                <Image style={{ position: 'absolute', height: 25, width: 25, tintColor: 'gray', left: 5 }} source={require('../src/images/search.png')} />
            </View>
            <View style={{ height: 500, padding: 15 }}>
                <FlatList data={listaVacinas} renderItem={(item) => <CardVacina item={item} navigation={props.navigation} />} numColumns={2} />
            </View>

            <TouchableOpacity style={styles.botao} onPress={NovaVacina}>
                <Text style={styles.texto}>Nova Vacina</Text>
            </TouchableOpacity>

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
    botao: {
        position: 'absolute',
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
        shadowColor: '#000000',
        bottom: 50
    },
    texto: {
        fontFamily: 'AveriaLibre-Regular',
        fontSize: 16,
        color: 'white'
    },
})

export default MinhasVacinas