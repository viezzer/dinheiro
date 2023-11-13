import React, { useState, useRef } from "react";
import {Animated, Easing, Text, StyleSheet, SafeAreaView, View, Modal, TouchableOpacity, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const IconPicker = ({ onSelect, onCancel }) => {
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
    const iconList = [
        'airplane-outline',
        'american-football-outline',
        'basketball-outline',
        'book-outline',
        'briefcase-outline',
        'camera-outline',
        'car-outline',
        'cart-outline',
        'cash-outline',
        'chatbox-outline',
        'clipboard-outline',
        'desktop-outline',
        'fast-food-outline',
        'film-outline',
        'game-controller-outline',
        'globe-outline',
        'heart-outline',
        'home-outline',
        'ice-cream-outline',
        'laptop-outline',
        'medical-outline',
        'musical-notes-outline',
        'paw-outline',
        'pencil-outline',
        'pizza-outline',
        'pricetag-outline',
        'restaurant-outline',
        'shirt-outline',
        'star-outline',
        'train-outline',
        'umbrella-outline',
        'watch-outline',
        // Adicione mais ícones conforme necessário
    ];      

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => onSelect(item)} style={styles.iconPick}>
      <Ionicons name={item} size={50} />
    </TouchableOpacity>
  );

  return (
    <>
        <TouchableOpacity onPress={() => resizeBox(1)} style={styles.openModalButton}>
            <Ionicons name="folder-open-outline" size={22} color={'#4caf50'} style={{marginLeft:100}}/>
            <Text style={{marginLeft:10, fontSize:12}}>Selecionar Icone</Text>
            <Modal visible={visible} transparent>
                <SafeAreaView
                    style={{flex:1, justifyContent:'center', alignItems:'center'}}
                    onTouchStart={() => resizeBox(0)}
                >
                    <Animated.View style={[styles.popup, {transform: [{scale}]}]}>
                    <FlatList
                        data={iconList}
                        renderItem={renderItem}
                        keyExtractor={(item) => item}
                        numColumns={4}
                    />
                    </Animated.View>
                </SafeAreaView>
                
            </Modal>
        </TouchableOpacity>
    </>
    
  );
};

const styles = StyleSheet.create({
    openModalButton: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#4caf50',
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    popup: {
        borderRadius: 10,
        borderColor: '#333',
        borderWidth: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 10,
        position: 'absolute',
    },
    iconPick: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 5,
        paddingVertical: 5,
        marginHorizontal:5,
        marginVertical:5,
    }
})

export default IconPicker;
