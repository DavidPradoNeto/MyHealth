import React from "react";
import { Image, ImageBackground, StyleSheet, Text, TextInput, View } from "react-native"
import LinearGradient from "react-native-linear-gradient";
import MyInput from "./MyInput"

const background = require('../src/images/background.png')
const icon = require('../src/images/vaccine-icon.png')

const Home = () => (
  <View style={styles.container}>

    <ImageBackground source={background} resizeMode="cover" style={styles.image}>
      <LinearGradient colors={['#54837E53', '#FFFFFF99', '#DDE6E5AD', '#3B5E5A82']} style={styles.image}>

        <Image
          style={styles.logo}
          source={icon}
        />
        <Text style={styles.appName}>MyHealth</Text>
        <Text style={styles.text}>Controle as suas vacinas e fique seguro</Text>
        <View style={{flexDirection: 'column', marginHorizontal: '5%', marginVertical: '30%'}}>
          <MyInput label={'E-Mail'}/>
          <MyInput label={'Senha'} />
        </View>
      </LinearGradient>
    </ImageBackground>

  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1
  },
  appName: {
    top: 20,
    fontFamily: 'AveriaLibre-Bold',
    textAlign: 'center',
    color: '#419ED7',
    fontSize: 42,
    lineHeight: 84,
    textDecorationLine: "underline"
  },
  text: {
    top: 100,
    margin: 20,
    fontFamily: 'AveriaLibre-Regular',
    textAlign: 'center',
    color: '#419ED7',
    fontSize: 32,
  },
  logo: {
    position: 'absolute',
    width: 50,
    height: 50,
    top: 40,
    left: 45
  }
});

export default Home;