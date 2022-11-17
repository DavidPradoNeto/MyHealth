import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import LinearGradient from "react-native-linear-gradient";
import { auth } from "../config/firebase";
import { useDispatch } from 'react-redux'
import { reducerSetUser } from "../redux/userSlice";


const background = require('../src/images/background.png')
const icon = require('../src/images/vaccine-icon.png')

const Login = (props) => {


  const [email, setEmail] = useState()
  const [senha, setSenha] = useState()

  const [validaSenha, setValidaSenha] = useState(0)

  const NovoUsuario = () => {
    props.navigation.navigate('Cadastrar')
  }

  const RecuperaSenha = () => {
    props.navigation.navigate('Recuperar')
  }


  useEffect(() => {
    if (auth.currentUser)
      props.navigation.navigate('Logado')
  }, [])

  const dispatch = useDispatch()

  const autenticarUsuario = () => {

    signInWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        
        dispatch(reducerSetUser({ email: email }))

        setEmail('')
        setSenha('')
        setValidaSenha(0)
        props.navigation.navigate('Logado')
      })
      .catch(() => {
        setValidaSenha(1)
      })
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

            <View style={styles.input}>
              <Text style={styles.texto}>E-mail</Text>
              <TextInput style={styles.textInput} value={email} onChangeText={setEmail} keyboardType='email-address' />
            </View>

            <View style={styles.input}>
              <Text style={styles.texto}>Senha </Text>
              <TextInput style={styles.textInput} value={senha} secureTextEntry={true} onChangeText={setSenha} textContentType='newPassword' />
            </View>

            <Text style={{
              color: '#FD7979',
              fontFamily: 'AveriaLibre-Regular',
              alignSelf: 'flex-start',
              left: 80,
              opacity: validaSenha
            }}>Usuario/Senha invalido!</Text>

            <TouchableOpacity style={styles.buttonEntrar} onPress={autenticarUsuario}>
              <Text style={styles.textButton}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonCriar} onPress={NovoUsuario}>
              <Text style={styles.textButton}>Criar minha conta</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonRecuperar} onPress={RecuperaSenha}>
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
  input: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '2%',
    marginRight: 20
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
  texto: {
    fontFamily: 'AveriaLibre-Regular',
    fontSize: 16,
    color: 'white'
  },
  logo: {
    position: 'absolute',
    width: 50,
    height: 50,
    top: 40,
    left: 45
  },
  inputs: {
    alignItems: 'center',
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
  textInput: {
    fontFamily: 'AveriaLibre-Regular',
    fontSize: 18,
    color: '#419ED7',
    padding: 5,
    backgroundColor: 'white',
    borderStyle: 'solid',
    width: 250,
    height: 26,
    left: 10
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