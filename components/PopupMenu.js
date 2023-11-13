import React, { useState, useRef } from "react";
import {TouchableOpacity, Modal, SafeAreaView, StyleSheet, View, Text, Animated, Easing} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const PopupMenu = () => {
    const {navigate} = useNavigation()
    const scale = useRef(new Animated.Value(0)).current;
    const [visible, setVisible] = useState(false)
    const defaultCashierOption = {
        title: 'Novo Caixa',
        icon: 'add-circle-outline',
        action: () => navigate('Criar novo Caixa')
    }
    const [cashierOptions, setCashierOptions] = useState([defaultCashierOption])

    const fetchCashierOptions = async () => {
        try {
          const optionsString = await AsyncStorage.getItem('@cashiers');
          if (optionsString) {
            console.log(optionsString)
            // transformar string em objeto json
            // setCashierOptions(JSON.parse(optionsString))
          } else {
            await AsyncStorage.setItem('@cashiers', `${JSON.stringify(defaultCashierOption)}`);
            console.log(JSON.stringify(defaultCashierOption))
          }
        } catch (error) {
          Alert.alert('Ops', 'Não foi possível carregar opções de caixa.');
          console.error(error);
        }
    
    }

    function resizeBox(value) {
        value === 1 && setVisible(true)
        Animated.timing(scale, {
            toValue: value,
            useNativeDriver: true,
            duration: 150,
            easing: Easing.exp,
        }).start(() => value === 0 && setVisible(false))
    }

    // useEffect(() => {
    //     console.log("O useEffect foi chamado!");
    //     fetchCashierOptions()
    //   }, []);

    return (
        <>
            <TouchableOpacity onPress={() => resizeBox(1)} style={styles.button}>
                <Ionicons name="file-tray-outline" size={22} color={'grey'}/>
                <Text style={styles.buttonText}>Caixa</Text>
                <Modal transparent visible={visible}>
                    <SafeAreaView
                        style={{flex:1}}
                        onTouchStart={() => resizeBox(0)}
                    >
                        <Animated.View style={[styles.popup, {transform: [{scale}]}]}>
                            {cashierOptions.map((option, i) => (
                                <TouchableOpacity 
                                    style={[styles.option, {borderBottomWidth: i === cashierOptions.length-1 ? 0 : 1}]} 
                                    key={i} 
                                    onPress={option.action}>
                                    <Text>{option.title}</Text>
                                    <Ionicons name={option.icon} size={22} style={{marginLeft:10}}/>
                                </TouchableOpacity>
                            ))}
                        </Animated.View>
                    </SafeAreaView>
                </Modal>
            </TouchableOpacity>
        </>
    )
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        height: 55,
        paddingHorizontal: 16,
        marginVertical: 16,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 8,
    },
    popup: {
        borderRadius: 10,
        borderColor: '#333',
        borderWidth: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        position: 'absolute',
        top: 115,
        right:10,
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 7,
        borderBottomColor: '#ccc',
    },
})

export default PopupMenu;