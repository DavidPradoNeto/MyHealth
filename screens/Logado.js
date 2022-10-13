import React from "react-native"
import { createDrawerNavigator } from "@react-navigation/drawer"
import Home from "./Home"

const Drawer = createDrawerNavigator()

const Logado = () => {
    return (
        <Drawer.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#C1E7E3',
            },
            headerTitle: 'Minhas Vacinas',

            headerTitleStyle: {
                fontFamily: 'AveriaLibre-Regular',
                color: '#419ED7',
                fontSize: 35
            }
        }}>

            <Drawer.Screen name="Home" component={Home} />

        </Drawer.Navigator>
    )
}

export default Logado