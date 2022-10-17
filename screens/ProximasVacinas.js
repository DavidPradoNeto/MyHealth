import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import listaVacinas from '../assets/listaVacinas'
import CardProximaVacina from '../components/CardProximaVacina'


const ProximasVacinas = (props) => {
    return (

        <View style={{ backgroundColor: '#ADD4D0', height: '100%' }}>

            <View style={{ height: 500, padding: 15 }}>
                <FlatList data={listaVacinas} renderItem={(item) => 
                    item.item.proximaVacina ?
                        <CardProximaVacina item={item} />
                        :
                        null
                } />
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



export default ProximasVacinas