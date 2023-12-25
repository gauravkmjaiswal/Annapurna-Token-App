// @ts-nocheck

import * as React from 'react';
import { Component } from 'react';

import { Button, Platform, StyleSheet, Text, View } from 'react-native';
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

const BASE_RESPONSE_TEXT = 'Response or error will show here.';

export default function Cashfree () {
    

    async function startCheckout() {
        try {
            const session = new CFSession(
                'session_YSXGUZUgcp7IJX3XqNCmz8-YNtfteUA80zFgs6BkWe5Wp8e8JNCVnzkaN33L1Pr6vOtxm48wb9tqak25LfIL6BgO2BYAJfWaedKKNswOAthp',
                '2',
                CFEnvironment.SANDBOX
            );
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
            console.log(JSON.stringify(dropPayment));
            CFPaymentGatewayService.doPayment(dropPayment);
        } catch (e) {
            console.log(e.message);
        }
    }

    async function startWebCheckout() {
        try {
            const session = new CFSession(
                'session_aylkHRUGzQST0wLy1MonXomw9sAQvascgHrHL3pIF4GMIPrCT1d-Z0i1qcxhUrcXNlsM23yzlhq-hfHQJwWIFFuTk7VKS7pzzt0GSbXr76Mu',
                'order_70512NasKYpCj67pGgPklgNF8zrPazT',
                CFEnvironment.SANDBOX
            );
            console.log('Session', JSON.stringify(session));
            CFPaymentGatewayService.doWebPayment(JSON.stringify(session));
        } catch (e) {
            console.log(e.message);
        }
    }
        return (
            <View style={styles.container}>
                <View style={styles.button}>
                    <Button onPress={() => startCheckout()} title="Start Payment" />
                </View>
                <View style={styles.button}>
                    <Button
                        onPress={() =>startWebCheckout()}
                        title="Start Web Payment"
                    />
                </View>
                <Text style={styles.response_text}> Hello </Text>
            </View>
        );
    }

const styles = StyleSheet.create({
    container: {
        padding: Platform.OS === 'ios' ? 56 : 24,
        backgroundColor: '#eaeaea',
        alignItems: 'center',
        flexDirection: 'column',
        flex: 1,
    },
    button: {
        color: '#61aafb',
        margin: 8,
        width: 200,
    },
    response_text: {
        margin: 16,
        fontSize: 14,
    },
});