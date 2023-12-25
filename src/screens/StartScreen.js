import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import Dashboard from './Dashboard'
import { StyleSheet } from 'react-native'

export default function StartScreen({ navigation }) {
  return (
    <Background>
      <Logo />
      <Paragraph>
        Token System
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
        style={styles.login}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}
        style={styles.signup}
      >
        Sign Up
      </Button>
    </Background>
  )
}
const styles = StyleSheet.create({
  login: {
    backgroundColor:'#364082'
  },
  signup:{
    color:'black',
  }
})
