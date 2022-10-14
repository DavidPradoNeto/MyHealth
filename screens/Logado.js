import React from "react-native"
import { createDrawerNavigator } from "@react-navigation/drawer"
import Home from "./Home"
import NovaVacina from "./NovaVacina"
import ProximasVacinas from "./ProximasVacinas"
import EditarVacina from "./EditarVacina"

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
            },
            drawerStyle: {
                backgroundColor: '#ADD4D0',
            }
        } 
        
        }>

            <Drawer.Screen name="Home" component={Home} />

            <Drawer.Screen name="Nova Vacina" component={NovaVacina}/>
            <Drawer.Screen name="Editar Vacina" component={EditarVacina}/>
            <Drawer.Screen name="Proximas Vacinas" component={ProximasVacinas} options={{ headerTitle: 'Proximas Vacinas'}}/>
        </Drawer.Navigator>
    )
}

export default Logado