import * as React from 'react';
import { View, Text, Image } from 'react-native';

export default function ExpenseScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                onPress={() => alert('Essa aqui é a Limão toda bobona com a plantinha.')}
                style={{ fontSize: 26, fontWeight: 'bold' }}>Expense Screen
            </Text>
            <Image source={require('../../assets/limaolindinha.jpg')} />
        </View>
    );
}