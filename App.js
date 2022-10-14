import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";


import Cadastro from "./screens/Cadastro";
import Login from "./screens/Login";
import Recuperar from "./screens/Recuperar";
import Logado from "./screens/Logado";


const Stack = createStackNavigator()


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Logado"
          component={Logado}
        />
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
      </Stack.Navigator>

    </NavigationContainer >
  )
}


export default App