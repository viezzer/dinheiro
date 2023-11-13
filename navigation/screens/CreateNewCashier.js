import React, { useState } from 'react';
import uuid from 'react-native-uuid';
import BackButton from '../../components/BackButton'
import IconPicker from '../../components/IconPicker'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Switch,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from '../../assets/styles/createNewCashierStyles'

const CreateNewCashier = () => {
  const { navigate } = useNavigation();
  const [title, setTitle] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('heart-outline');
  const handleIconSelect = (icon) => {
    setSelectedIcon(icon);
  };

  async function handleCreateNewCashier() {
    try {

      if (title.trim() === '') {
        return Alert.alert('Ops', 'Informe uma descrição para a transação');
      }

      const newCashier = {
        title: title,
        icon: selectedIcon,
        action: setSelectedCashier('@transactions-'+title),
      };

      let cashiersString = await AsyncStorage.getItem('@cashiers');

      if (cashiersString) {
        // console.log(transactionsString)
        let parsedCashiers = JSON.parse(cashiersString);
        parsedCashiers.push(newCashier);
        await AsyncStorage.setItem('@cashiers', JSON.stringify(parsedCashiers));
      } else {
        alert("Nenhum caixa registrado :(")
      }

      setTitle('');

      //substituir por pop up?
      Alert.alert('Novo Caixa', 'Caixa criado com sucesso');
      navigate('Transações')
    } catch (error) {
      console.error(error);
      Alert.alert('Ops', 'Não foi possível criar o caixa :(');
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackButton />
        <Text style={styles.headerText}>Novo Caixa</Text>

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          placeholder="ex.: Meu Restaurante, Meu estúdio de Tattoo"
          placeholderTextColor="#bdbdbd"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Icone</Text>
        <IconPicker onSelect={handleIconSelect}/>
        {selectedIcon && 
          <Ionicons 
            name={selectedIcon} 
            size={50} 
            style={{alignSelf:'center', paddingVertical:20}}/>
        }
        

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={handleCreateNewCashier}
        >
          <Feather name="check" size={20} color="white" />
          <Text style={styles.buttonText}>Confirmar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default CreateNewCashier;
