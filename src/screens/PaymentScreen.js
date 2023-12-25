// import React from 'react'
// import Background from '../components/Background'
// import Logo from '../components/Logo'
// import Header from '../components/Header'
// import Paragraph from '../components/Paragraph'
// import { PlatformPayButton, usePlatformPay } from '@stripe/stripe-react-native';
// import { Alert } from 'react-native';

// export default function PaymentScreen({ navigation }) {
    
//     const {
//         isPlatformPaySupported,
//         confirmPlatformPayPayment,
//     } = usePlatformPay();
//     React.useEffect(() => {
//         (async function () {
//             if (!(await isPlatformPaySupported({ googlePay: { testEnv: true } }))) {
//                 Alert.alert('Google Pay is not supported.');
//                 return;
//             }
//         })();
//     }, []);
//     const fetchPaymentIntentClientSecret = async () => {
//         // Fetch payment intent created on the server, see above
//         try{
//             const response = await fetch(`http://192.168.97.245:8080/intents`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     amount: 16999 * 100,
//                 }),
//             });
//             const res = await response.json();
//             const paymentIntent = res["paymentIntent"];
//             return paymentIntent;
//         }catch(err){
//             console.log(err)
//             return 'Arnav'
//         }
//     };
//     const pay = async () => {
//         const clientSecret = await fetchPaymentIntentClientSecret();
//         const { error } = await confirmPlatformPayPayment(
//             clientSecret,
//             {
//                 googlePay: {
//                     testEnv: true,
//                     merchantName: 'Arnav Khare',
//                     merchantCountryCode: 'IN',
//                     currencyCode: 'INR',
//                 },
//             }
//         );
//         if (error) {
//             Alert.alert('Success', 'The payment was confirmed successfully.');
//             return;
//         }
//     };
//     return (
//         <Background>
//             <Logo />
//             <Header>Welcome</Header>
//             <Paragraph>
//                 To Annapurna Mess Token System
//             </Paragraph>
//             <PlatformPayButton
//                 onPress={pay}
//                 style={{
//                     width: '100%',
//                     height: 50,
//                     backgroundColor:"white"
//                 }}
//             />
//         </Background>
//     )
// }
