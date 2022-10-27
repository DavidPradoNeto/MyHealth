import React, { Image, Text } from "react-native"
import { createDrawerNavigator } from "@react-navigation/drawer"
import ProximasVacinas from "./ProximasVacinas"
import { auth } from "../config/firebase"
import { signOut } from "firebase/auth"
import MinhasVacinas from "./MinhasVacinas"
import MyDrawer from "../components/MyDrawer"

const Drawer = createDrawerNavigator()

const Logado = (props) => {

    const Logout = () => {
        signOut(auth)
        props.navigation.pop()
      }

    return (
        <Drawer.Navigator 
        
        drawerContent={(props) => <MyDrawer {...props}/>}
        
        
        
        screenOptions={{
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

            <Drawer.Screen
                name="MinhasVacinas"
                component={MinhasVacinas}
                options={{
                    drawerLabel: 'Minhas Vacinas',
                    drawerLabelStyle: {
                        fontFamily: 'AveriaLibre-Bold',
                        fontSize: 18,
                        color: '#419ED7'
                    },
                    drawerIcon: () => (
                        <Image
                            style={{ left: 20, width: 23, height: 23 }}
                            source={require('../src/images/vaccine-icon.png')}
                        />
                    )

                }}
            />
            <Drawer.Screen
                name="Proximas Vacinas"
                component={ProximasVacinas}
                options={{
                    headerTitle: 'Proximas Vacinas',
                    drawerLabelStyle: {
                        fontFamily: 'AveriaLibre-Bold',
                        fontSize: 18,
                        color: '#419ED7'
                    },
                    drawerIcon: () => (
                        <Image
                            style={{ left: 20, width: 23, height: 23, tintColor: 'black' }}
                            source={require('../src/images/calendar.png')}
                        />
                    )
                }}
            />
            <Drawer.Screen
                name="Sair"
                component={Logout}
                options={{
                    drawerLabel: 'Sair',
                    drawerLabelStyle: {
                        fontFamily: 'AveriaLibre-Bold',
                        fontSize: 20,
                        color: '#419ED7'
                    },
                    drawerIcon: () => (
                        <Image
                            style={{ left: 20, width: 23, height: 23 }}
                            source={require('../src/images/sair.png')}
                        />
                    )
                }}
            />
        </Drawer.Navigator>
    )
}




export default Logado