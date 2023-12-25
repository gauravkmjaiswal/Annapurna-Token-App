// import './global'
import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './src/core/theme'
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  // ResetPasswordScreen,
  Dashboard,
  Payment,
  Cashfree,
  CheckoutBuy
} from './src/screens'
import Redeem from './src/screens/Redeem'

const Stack = createStackNavigator()

export default function App() {
  return (
    <>
      {/* <Provider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Checkout"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="StartScreen" component={StartScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="CheckoutBuy" component={CheckoutBuy} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider> */}
      <Redeem />
    </>
  )
}