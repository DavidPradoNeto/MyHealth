import { StyleSheet, Text, View, Dimensions, Image, Pressable } from 'react-native'

const CardVacina = (props) => {

    const { item } = props

    const editar =  () => {
        props.navigation.push('Vacina', { id: item.id })
    }

    return (
        <Pressable style={styles.container} onPress={editar}>
            <Text style={{ ...styles.text, fontSize: 26 }}>{item.vacina}</Text>
            <Text style={{ ...styles.text, backgroundColor: '#419ED7', color: 'white', width: 80, textAlign: 'center' }}>{item.dose}</Text>
            <Text style={{ ...styles.text, color: 'gray', marginTop: 2 }}>{item.data}</Text>
            <Image style={{ flex: 1, width: 150, height: 80 }} source={{ uri: item.urlImage }} />

            {item.proximaVacina ?
                <Text style={{ ...styles.text, color: '#FF8383', alignSelf: 'flex-end', right: 10, bottom: 1 }}>{item.proximaVacina}</Text>
                :

                <Text style={{ ...styles.text, color: '#FF8383', alignSelf: 'flex-end', right: 10, bottom: 1 }}>Não há próxima dose</Text>
            }
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: (Dimensions.get('window').width / 2) - 25,
        marginVertical: 5,
        marginHorizontal: 5,
        alignItems: 'center',
        borderRadius: 10,
        paddingTop: 5
    },
    text: {
        fontFamily: 'AveriaLibre-Regular',
        color: '#419ED7',
        textAlignVertical: 'center'
    },

})

export default CardVacina