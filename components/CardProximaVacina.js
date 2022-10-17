 import {StyleSheet, Text, View, Dimensions, Image, Pressable} from 'react-native'

const CardVacina = (props) => {
    
    const {item} = props.item


    return(
        <View style={styles.container}>
            <Text style={{...styles.text, fontSize: 26}}>{item.vacina}</Text>
            <Text style={{...styles.text, color: 'gray', bottom: 5}}>{item.proximaVacina}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginVertical: 5,
        marginHorizontal: 5,
        alignItems: 'flex-start',
        borderRadius: 10,
        paddingTop: 5
    },
    text: {
        fontFamily: 'AveriaLibre-Regular',
        color: '#419ED7',
        textAlignVertical: 'center',
        left: 10,
        marginTop: 5
    },

})

export default CardVacina