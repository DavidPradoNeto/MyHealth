import React from "react";
import { Button, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import LinearGradient from "react-native-linear-gradient";
import MyInput from "../components/MyInput"

const background = require('../src/images/background.png')
const icon = require('../src/images/vaccine-icon.png')

const Login = (props) => {

  const NovoUsuario = () => {
    props.navigation.navigate('Cadastrar')
  }


  return (
    <View style={styles.container}>

      <ImageBackground source={background} resizeMode="cover" style={styles.image}>
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          colors={['rgba(59, 94, 90, 0.9)', 'rgba(221, 230, 229, 0.9)', 'rgba(255, 255, 255, 0.62)', 'rgba(84, 131, 126, 0.6)']}
          style={styles.image}>

          <Image
            style={styles.logo}
            source={icon}
          />
          <Text style={styles.appName}>MyHealth</Text>
          <Text style={styles.text}>Controle as suas vacinas e fique seguro</Text>
          <View style={styles.inputs}>
            <MyInput label={'E-Mail'} />
            <MyInput label={'Senha'} />
            <TouchableOpacity style={styles.buttonEntrar}>
              <Text style={styles.textButton}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonCriar} onPress={NovoUsuario}>
              <Text style={styles.textButton}>Criar minha conta</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonRecuperar}>
              <Text style={styles.textEsqueci}>Esqueci minha senha</Text>
            </TouchableOpacity>
          </View>

        </LinearGradient>
      </ImageBackground>

    </View>
  )
};

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
    top: 50,
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
  },
  inputs: {
    flexDirection: 'column',
    marginHorizontal: '8%',
    marginVertical: '20%'
  },
  buttonEntrar: {
    backgroundColor: '#49B976',
    borderColor: '#37BD6D',
    borderStyle: 'solid',
    borderWidth: 1,
    width: 188,
    height: 50,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 50,
    elevation: 4,
    shadowColor: '#000000',
  },
  buttonCriar: {
    backgroundColor: '#419ED7',
    borderColor: '#419ED7',
    borderStyle: 'solid',
    borderWidth: 1,
    width: 285,
    height: 50,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 50,
    elevation: 4,
    shadowColor: '#000000',
  },
  buttonRecuperar: {
    backgroundColor: '#B0CCDE',
    borderColor: '#B0CCDE',
    borderStyle: 'solid',
    borderWidth: 1,
    width: 285,
    height: 37,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 40,
    elevation: 4,
    shadowColor: '#000000',
  },
  textButton: {
    fontFamily: 'AveriaLibre-Regular',
    fontSize: 28,
    color: 'white'
  },
  textEsqueci: {
    fontFamily: 'AveriaLibre-Regular',
    fontSize: 24,
    color: 'white'
  }
});

export default Login;