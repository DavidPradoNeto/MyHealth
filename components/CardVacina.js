import { StyleSheet, Text, Dimensions, Image, Pressable } from 'react-native'
import { TextMask } from 'react-native-masked-text'

import { useDispatch } from 'react-redux'
import { reducerSetVacina } from '../redux/vacinaSlice'

const CardVacina = (props) => {

    const { item } = props

    const dispatch = useDispatch()

    const editar = () => {
        dispatch(reducerSetVacina({ id: item.id, vacina: item }))
        props.navigation.push('Vacina')
    }

    return (
        <Pressable style={styles.container} onPress={editar}>
            <Text style={{ ...styles.text, fontSize: 26 }}>{item.vacina}</Text>
            <Text style={{ ...styles.text, backgroundColor: '#419ED7', color: 'white', width: 80, textAlign: 'center' }}>{item.dose}</Text>

            <TextMask
                type={'datetime'}
                options={{
                    format: 'DD/MM/YYYY'
                }}
                value={item.data}
                style={{ ...styles.text, color: 'gray', marginTop: 2 }}
            />
            <Image style={{ flex: 1, width: 150, height: 80 }} source={{ uri: item.urlImage }} />

            {item.proximaVacina ?
                <Text style={{ ...styles.text, color: '#FF8383', right: 10, alignSelf: 'flex-end', bottom: 1 }}>Proxíma dose: {item.proximaVacina}</Text>
                :

                <Text style={{ ...styles.text, color: '#FF8383', alignSelf: 'flex-end', right: 10, bottom: 1 }}>Não há próxima dose</Text>
            }
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: (Dimensions.get('window').width / 2) -25,
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
    }
})

export default CardVacina