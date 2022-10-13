import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { createDrawerNavigator } from "@react-navigation/drawer"
import { NavigationContainer } from "@react-navigation/native"

const Drawer = createDrawerNavigator()

const icon = require('../src/images/vaccine-icon.png')
const menuIcon = require('../src/images/drawer_icon.png')

const Home = (props) => {

    return (

        <View style={{ backgroundColor: '#ADD4D0', height: '100%' }}>
            
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
    }
})

export default Home