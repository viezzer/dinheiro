import * as React from 'react';
import { View, Text } from 'react-native';

export default function IncomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                onPress={() => alert('This is the "Income" screen.')}
                style={{ fontSize: 26, fontWeight: 'bold' }}>Acabou as fotos da limão salvas no meu notebook :/</Text>
        </View>
    );
}