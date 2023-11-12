import React, { useState } from 'react';
import uuid from 'react-native-uuid';
import BackButton from '../../components/BackButton'
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
import dayjs from 'dayjs';
import styles from '../../assets/styles/newTransactionStyles'

const NewTransaction = ({route}) => {
  const {selectedCashier} = route.params;
  const [title, setTitle] = useState('');
  const [inputAmount, setInputAmount] = useState('');
  const [isExpense, setIsExpense] = useState(false);

  async function handleCreateNewTransaction() {
    try {
      const amount = parseFloat(inputAmount.replace(',', '.'));

      if (title.trim() === '') {
        return Alert.alert('Ops', 'Informe uma descrição para a transação');
      }
      if (!amount) {
        return Alert.alert('Ops', 'Informe um valor para a transação');
      }

      const transaction = {
        id: uuid.v4(),
        title: title,
        amount: isExpense ? -amount : +amount,
        created_at: dayjs().format('DD/MM/YYYY').toString(),
      };

      let transactionsString = await AsyncStorage.getItem(selectedCashier);

      if (transactionsString) {
        // console.log(transactionsString)
        let parsedTransactions = JSON.parse(transactionsString);
        parsedTransactions.push(transaction);
        await AsyncStorage.setItem(selectedCashier, JSON.stringify(parsedTransactions));
      } else {
        await AsyncStorage.setItem(selectedCashier, `[${JSON.stringify(transaction)}]`);
      }

      setTitle('');
      setInputAmount('');

      //substituir por pop up?
      Alert.alert('Nova Transação', 'Transação criada com sucesso');
    } catch (error) {
      console.error(error);
      Alert.alert('Ops', 'Não foi possível criar a transação :(');
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackButton />
        <Text style={styles.headerText}>Nova transação</Text>
        <Text style={styles.label}>Tipo da transação</Text>
        <View style={styles.switchContainer}>
          <Switch
            trackColor={{ false: '#2ecc71', true: '#c0392b' }}
            thumbColor={'#fff'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setIsExpense(!isExpense)}
            value={isExpense}
          />
          <Text
            style={styles.switchLabel}
          >
            {isExpense ? 'DESPESA' : 'RECEITA'}
          </Text>
        </View>

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          placeholder="ex.: Almoço, Salário, Netflix, etc..."
          placeholderTextColor="#bdbdbd"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Valor</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="0.00"
          placeholderTextColor="#bdbdbd"
          value={inputAmount}
          onChangeText={setInputAmount}
        />

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={handleCreateNewTransaction}
        >
          <Feather name="check" size={20} color="white" />
          <Text style={styles.buttonText}>Confirmar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default NewTransaction;
