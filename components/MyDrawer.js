import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer"
import { StyleSheet, Text, View } from "react-native"




const MyDrawer = (props) => {

    const nome = 'Jurandir'
    return(
        <DrawerContentScrollView>
            <View style={styles.container}>
            <Text style={styles.texto}>Olá {nome}</Text>
            <View style={styles.line}/>
            </View>
            
            <DrawerItemList {...props}/>
            
        </DrawerContentScrollView>        
    )
}

const styles = StyleSheet.create({
    container: {alignItems: 'center', marginVertical: '15%'},
    texto: {color: '#419ED7', fontFamily: 'AveriaLibre-Regular', fontSize: 30},
    line: {borderWidth: 1, borderColor: '#419ED7', width: 200, marginTop: 35}
})
export default MyDrawer