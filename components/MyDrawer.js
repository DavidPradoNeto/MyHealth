import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer"
import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { auth, db } from "../config/firebase"




const MyDrawer = (props) => {

    const [nome, setNome] = useState('')

    useEffect(() => {
        getDoc(doc(db, "usuarios", auth.currentUser.email))
            .then((result) => {
                setNome(result.data().nome)
            })
            .catch((error) =>
                console.log("Erro ao buscar dados do usuario " + error)
            )
    }, [])



    return (
        <DrawerContentScrollView>
            <View style={styles.container}>
                <Text style={styles.texto}>Olá {nome} </Text>
                <View style={styles.line} />
            </View>

            <DrawerItemList {...props} />

        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    container: { alignItems: 'center', marginVertical: '15%' },
    texto: { color: '#419ED7', fontFamily: 'AveriaLibre-Regular', fontSize: 30 },
    line: { borderWidth: 1, borderColor: '#419ED7', width: 200, marginTop: 35 }
})
export default MyDrawer