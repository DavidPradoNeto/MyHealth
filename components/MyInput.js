import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";


const MyInput = (props) => {

    const {label, value, onChangeText} = props

    return(
        <View style={styles.input}>
        <Text style={styles.texto}>{label}</Text>
        <TextInput style={styles.textInput} value={value} onChangeText={onChangeText} />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginVertical: '2%'
    },
    texto:{
        fontFamily: 'AveriaLibre-Regular',
        fontSize: 20,
        color: 'white'
    },
    textInput: {
        fontFamily: 'AveriaLibre-Regular',
        fontSize: 20,
        color: '#419ED7',
        padding: 5,
        backgroundColor: 'white',
        borderStyle: 'solid',
        width: 300,
        height: 30,
        left: 5
    }
})

export default MyInput