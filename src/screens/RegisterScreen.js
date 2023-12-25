import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { enrollmentNumberValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { studentDetails } from '../helpers/studentDetails';
import axios from 'axios';

export default function RegisterScreen({ navigation }) {
  const [wallet, setWallet] = useState({ value: '', error: '' })
  const [enrollmentNumber, setEnrollmentNumber] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const onSignUpPressed = async () => {
    const enrollmentNumberError = enrollmentNumberValidator(enrollmentNumber.value)
    const passwordError = passwordValidator(password.value)
    if (enrollmentNumberError || passwordError) {
      setEnrollmentNumber({ ...enrollmentNumber, error: enrollmentNumberError })
      setPassword({ ...password, error: passwordError })
      return
    }
    try {
      const studentType  = studentDetails(enrollmentNumber.value);
      if(studentType === -1){
        setEnrollmentNumber({...enrollmentNumber,error:"Student Does not Exist in the DataBase"})
        setPassword({...password,error:"Student Does not Exist in the DataBase"});
        return;
      }
      const res = await axios.post(`http://192.168.97.245:8080/signup`, { enrollmentNumber: enrollmentNumber.value, password: password.value, studentType:studentType.studentType });
      navigation.reset({
        index: 0,
        routes: [{ name: 'Dashboard' }],
      })
    } catch (err) {
      console.log(err)
      if (err.response?.status && err.response.status === 404) {
        setEnrollmentNumber({ ...enrollmentNumber, error: 'Enrollment Number Already Registered' });
      } else {
        console.log('Unknow Error => ', err)
      }
      return;
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    })
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Create Account</Header>
      <TextInput
        label="Enrollment Number"
        returnKeyType="next"
        value={String(enrollmentNumber.value)}
        onChangeText={(text) => setEnrollmentNumber({ value: text, error: '' })}
        error={!!enrollmentNumber.error}
        errorText={enrollmentNumber.error}
        autoCapitalize="none"
        // autoCompleteType="enrollmentNumber"
        // textContentType="enrollmentNumber"
        keyboardType="numeric"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={String(password.value)}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <TextInput
        label="MetaMask Wallet"
        returnKeyType="done"
        value={String(wallet.value)}
        onChangeText={(text) => setWallet({ value: text, error: '' })}
        error={!!wallet.error}
        errorText={wallet.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
