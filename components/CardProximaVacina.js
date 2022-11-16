import { StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native'

const CardVacina = (props) => {

    const { item } = props.item


    return (
        <View style={styles.container}>
            <Text style={{ ...styles.text, fontSize: 26 }}>{item.vacina}</Text>
            <Text style={{ ...styles.text, color: 'gray', bottom: 5 }}>{item.proximaVacina}</Text>
            <TouchableOpacity style={{ position: 'absolute', alignItems: 'center', alignSelf: 'flex-end', right: 50 }}
                onPress={() => {
                    Linking.openURL('https://maps.google.com?q=' + item.latitude + "," + item.longitude)
                }
                }>
                <Text style={{ padding: 3, fontFamily: 'AveriaLibre-Regular', color: 'gray' }}>Mostrar no Mapa</Text>
                <Image style={{ width: 32, height: 32, tintColor: '#419ED7' }} source={require("../src/images/map-pointer.png")} />
            </TouchableOpacity>
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