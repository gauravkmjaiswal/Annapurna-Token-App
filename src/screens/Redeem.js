import React, { useState ,useEffect} from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
export default function Redeem({ navigation }) {
    const storeData = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.log(error);
        }
    };

    const metamaskUrlScheme = 'https://metamask.app.link/';
    const [text, onChangeText] = React.useState(' ');
    const [amount, onChangeAmount] = React.useState('1');
    const [name, onChangeName] = React.useState('Gaurav Km Jaiswal');
    useEffect(() => {
        Linking.canOpenURL(metamaskUrlScheme).then(supported => {
            if (supported) {
                // Linking.openURL(metamaskUrlScheme);
            } else {
                console.log("Metamask not installed");
            }
        });
    }, []);
    const [tokens, setTokens] = useState(1)
    const up = () => {
        if (tokens >= 3) {
            Alert.alert("Can Only Redeem upto 3 Tokens at a time..!")
            return;
        }
        setTokens(tokens + 1);
    }
    const down = () => {
        if (tokens <= 1) {
            Alert.alert("Buy Value must be greater than 0")
            return;
        }
        setTokens(tokens - 1);
    }
    const openMetaMask = ()=>{
        Linking.openURL(metamaskUrlScheme);
// }       navigation.navigate("Verify")
    }
    return (
        <Background>
            <Header>Redeem Tokens..!</Header>
            <Logo />
            <View style={styles.tokenContainer}>
                <Header>Currently You have : 12 Tokens</Header>
            </View>
            <View style={styles.tokenPurchase}>
                <Paragraph>Tokens to Redeem : </Paragraph>
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
                    onPress={() => { openMetaMask () }}
                >
                    Redeem
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