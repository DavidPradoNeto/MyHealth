import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";


import Cadastro from "./screens/Cadastro";
import Login from "./screens/Login";
import Recuperar from "./screens/Recuperar";
import Logado from "./screens/Logado";
import NovaVacina from "./screens/NovaVacina";

import { Provider } from "react-redux"
import { store } from "./redux/store"

const Stack = createStackNavigator()


const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Login"
            component={Login}
          />
          <Stack.Screen
            name="Cadastrar"
            component={Cadastro}
          />
          <Stack.Screen
            name="Recuperar"
            component={Recuperar}
          />
          <Stack.Screen
            name="Logado"
            component={Logado}
          />
          <Stack.Screen
            name="Vacina"
            component={NovaVacina}
          />
        </Stack.Navigator>

      </NavigationContainer >
    </Provider>
  )
}


export default App