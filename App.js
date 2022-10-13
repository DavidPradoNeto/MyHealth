import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import Cadastro from "./screens/Cadastro";
import Login from "./screens/Login";


const Stack = createStackNavigator()
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
          name="Login"
          component={Login}
      />  
      <Stack.Screen
          name="Cadastrar"
          component={Cadastro}
      />  

      </Stack.Navigator>

</NavigationContainer >







  )
}

const style = StyleSheet.create({

})

export default App