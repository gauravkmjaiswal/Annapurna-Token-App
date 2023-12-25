import React, { useState } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios'
import {
    CFPaymentGatewayService,
    CFErrorResponse,
} from 'react-native-cashfree-pg-sdk';
import {
    CFDropCheckoutPayment,
    CFEnvironment,
    CFPaymentComponentBuilder,
    CFPaymentModes,
    CFSession,
    CFThemeBuilder,
} from 'cashfree-pg-api-contract';
export default function Dashboard({ navigation }) {
    const [tokens, setTokens] = useState(1)
    const up = () => {
        if (tokens >= 3) {
            Alert.alert("Can Only Buy upto 3 Tokens at a time..!")
            return;
        }
        setTokens(tokens + 1);
    }
    const down = () => {
        if (tokens <= 1) {
            Alert.alert("Token Value must be greater than 0")
            return;
        }
        setTokens(tokens - 1);
    }
    const payment = async () => {
        try {
            const headers = {
                "Content-Type": "application/json",
                "x-api-version": "2022-09-01",
                "x-client-id": "TEST3727447f463537fa5833f22bb4447273",
                "x-client-secret": "TESTf259f515125d23800975a978e1c71ebaf5d96c4e",
            }
            const unique = 22;
            const order_ID = `order_${unique}`
            const data = {
                "order_id": order_ID,
                "order_amount": tokens*60,
                "order_currency": "INR",    
                "order_note": "Additional order info",
                "customer_details": {
                    "customer_id": "12345",
                    "customer_name": "name",
                    "customer_email": "care@cashfree.com",
                    "customer_phone": "9816512345"
                }
            }
            const res = await axios.post('https://sandbox.cashfree.com/pg/orders', data, { headers: headers });
            const sessionId = res["data"]["payment_session_id"];
            const session = new CFSession(sessionId,order_ID,CFEnvironment.SANDBOX);
            const paymentModes = new CFPaymentComponentBuilder()
                .add(CFPaymentModes.CARD)
                .add(CFPaymentModes.UPI)
                .add(CFPaymentModes.NB)
                .add(CFPaymentModes.WALLET)
                .add(CFPaymentModes.PAY_LATER)
                .build();
            const theme = new CFThemeBuilder()
                .setNavigationBarBackgroundColor('#E64A19')
                .setNavigationBarTextColor('#FFFFFF')
                .setButtonBackgroundColor('#FFC107')
                .setButtonTextColor('#FFFFFF')
                .setPrimaryTextColor('#212121')
                .setSecondaryTextColor('#757575')
                .build();
            const dropPayment = new CFDropCheckoutPayment(
                session,
                paymentModes,
                theme
            );
            CFPaymentGatewayService.doPayment(dropPayment);
            setInterval(async function () {  

                await axios.get()

            }, 1000);
        } catch (err) {
            console.log(err)
        }

    }
    return (
        <Background>
            <Header>Buy Tokens..!</Header>
            <Logo />
            <View style={styles.tokenContainer}>
                <Header>Currently You have : 12 Tokens</Header>
            </View>
            <View style={styles.tokenPurchase}>
                <Paragraph>Tokens to Purchase : </Paragraph>
                <Paragraph>{tokens}</Paragraph>
                <View style={styles.counterContainer}>
                    <TouchableOpacity
                        onPress={up}
                        style={styles.counter}>
                        <Image
                            style={styles.image}
                            source={require('../assets/arrow_up.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={down}
                        style={styles.counter}>
                        <Image
                            style={styles.image}
                            source={require('../assets/arrow_down.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    style={{ backgroundColor: "#364082" }}
                    mode="contained"
                    onPress={() => payment()}
                >
                    Checkout
                </Button>
            </View>
        </Background>
    )
}
const styles = StyleSheet.create({
    counterContainer: {
        width: "100%",
        marginTop: -20,
        marginLeft: 10,
    },
    tokenPurchase: {
        // borderColor: "red",
        // borderStyle: "solid",
        // borderWidth: 2,
        display: "flex",
        flexDirection: "row",
        width: "90%",
        alignItems: "center"
    },
    ImageIconStyle: {
        width: "100%"
    },
    counter: {
        borderColor: "#364082",
        borderStyle: "solid",
        borderWidth: 2,
        height: 40,
        width: 50,
        borderRadius: 10,
        textAlign: "center",
        marginTop: 10,
        color: "white",
        justifyContent: "center",
        alignItems: "center"
    },
    nameContainer: {
        marginBottom: 50
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    tokenContainer: {
        width: "100%",
        height: 140,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonContainer: {
        width: "100%",
        marginTop: 55,
        marginBottom: 0
    },
    count: {
        width: 100,
        marginVertical: 5,
        color: '#5a2961',
        fontSize: 40,
        textAlign: 'center',
    },
    image: {
        width: 32,
        height: 32,
    },
})