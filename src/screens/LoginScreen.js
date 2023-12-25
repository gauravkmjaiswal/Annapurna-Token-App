import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
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
import axios from 'axios';

export default function LoginScreen({ navigation }) {
  const [enrollmentNumber, setEnrollmentNumber] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [loading, setLoading] = useState(false);

  const onLoginPressed = async () => {
    console.log('Login Button Pressed..!')
    const enrollmentNumberError = enrollmentNumberValidator(enrollmentNumber.value)
    const passwordError = passwordValidator(password.value)
    if (enrollmentNumberError || passwordError) {
      setEmail({ ...enrollmentNumber, error: enrollmentNumberError })
      setPassword({ ...password, error: passwordError })
      return
    }
    try{
      const res = await axios.post(`http://172.16.110.228:8080/signin`,{
      enrollmentNumber:enrollmentNumber.value,password:password.value});
      navigation.reset({
        index: 0,
        routes: [{ name: 'Dashboard' }],
      })
    }catch(err){
      if (err.response?.status && err.response.status === 404){
        setEnrollmentNumber({...enrollmentNumber,error:'User Not Found'});
      } else if (err.response?.status && err.response.status === 401){
        setPassword({...password,error:'Password Incorrect'})
      }else{
        console.log('Unknow Error => ',err)
        console.log(err)
      }
      return;
    }
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
       <Logo />
       <Header>Annapurna Token System</Header>
       <TextInput
        label="Enrollment Number"
        returnKeyType="next"
        value={String(enrollmentNumber.value)}
        onChangeText={(text) => setEnrollmentNumber({ value: text, error: '' })}
        error={!!enrollmentNumber.error}
        errorText={enrollmentNumber.error}
        autoCapitalize="none"
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
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})


