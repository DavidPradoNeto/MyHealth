import React from "react";
import Home from './components/Home'
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Logado from "./components/Logado";
import { ImageBackground, StatusBar, StyleSheet } from "react-native";

const Stack = createStackNavigator()
const App = () => {
  return (
    <NavigationContainer>
      {/* <StatusBar hidden /> */}
      
      <Stack.Navigator>
        <Stack.Screen
          name="Logado"
          component={Logado}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

const style = StyleSheet.create({

})

export default App