import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
export default function Dashboard({ navigation }) {

  return (
    <Background>
    <View style={styles.nameContainer}>
      <Header>Arnav Khare</Header>
        <Button
        style={{width:100,height:50}}
          mode="outlined"
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'StartScreen' }],
            })
          }
        >
          Logout
        </Button>
    </View>
    <Logo/>
      <View style={styles.tokenContainer}>
        <Header>Current You have : 12 Tokens</Header>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('CheckoutBuy')}
        >
          Buy
        </Button>
        <Button
          mode="contained"
          style={styles.Use}
          onPress={() =>
            // navigation.reset({
            //   index: 0,
            //   routes: [{ name: 'StartScreen' }],
            // })
            use()
          }
        >
          Use
        </Button>
      </View>
    </Background>
  )
}
const styles = StyleSheet.create({
  Use: {
    backgroundColor: '#364082'
  },
  nameContainer:{
    display:"flex",
    flexDirection:"row",
    marginBottom:0,
    marginTop:0,
    justifyContent:"space-between",
    alignItems:"center",
    width:"100%"
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  tokenContainer:{
    width:"100%",
    height:140,
    justifyContent:"center",
    alignItems:"center"
  },
  buttonContainer:{
    width:"100%",
    marginTop:55,
    marginBottom:0
  },
  count: {
    width: 100,
    marginVertical: 5,
    color: '#5a2961',
    fontSize: 40,
    textAlign: 'center',
  },
})