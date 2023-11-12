import React, { useState, useRef } from "react";
import {TouchableOpacity, Modal, SafeAreaView, StyleSheet, View, Text, Animated, Easing} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PopupMenu = ({options}) => {
    const [visible, setVisible] = useState(false)
    const scale = useRef(new Animated.Value(0)).current;
    function resizeBox(value) {
        value === 1 && setVisible(true)
        Animated.timing(scale, {
            toValue: value,
            useNativeDriver: true,
            duration: 150,
            easing: Easing.exp,
        }).start(() => value === 0 && setVisible(false))
    }
    return (
        <>
            <TouchableOpacity onPress={() => resizeBox(1)}>
                <Ionicons name="file-tray-outline" size={22} color={'blue'}/>
                <Modal transparent visible={visible}>
                    <SafeAreaView
                        style={{flex:1}}
                        onTouchStart={() => resizeBox(0)}
                    >
                        <Animated.View style={[styles.popup, {transform: [{scale}]}]}>
                            {options.map((option, i) => (
                                <TouchableOpacity 
                                    style={[styles.option, {borderBottomWidth: i === options.length-1 ? 0 : 1}]} 
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