import { TouchableOpacity, Text } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function BackButton(){
    const { goBack } = useNavigation();
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={goBack}
            style={{flexDirection: 'row', alignItems: 'center'}}
        >
            <Feather
                name="arrow-left"
                size={32}
                color='black'
            />
            <Text style={{fontSize:15, marginLeft:10}}>Voltar</Text>
        </TouchableOpacity>
    )
}