import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer"
import { doc, onSnapshot, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { db } from "../config/firebase"
import { useSelector } from "react-redux"




const MyDrawer = (props) => {

    const [nome, setNome] = useState('')
    
    const email = useSelector((state) => state.user.email)
    
    const q = query(doc(db, "usuarios", email))

    useEffect(() => {
        onSnapshot(q, (result) => {
           setNome(result.data().nome.split(' ')[0])
            })
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