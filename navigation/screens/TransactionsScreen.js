import React, { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import PopupMenu from'../../components/PopupMenu';
import TransactionListItem from '../../components/TransactionListItem';
import styles from '../../assets/styles/transactionsScreenStyle';
import {
  ScrollView,
  Text,
  View,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Feather } from 'react-native-vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TransactionsScreen = () => {
  const { navigate } = useNavigation();
  const [loading, setLoading] = useState(true);
  const [selectedCashier, setSelectedCashier] = useState('@transactions-default');
  const [transactions, setTransactions] = useState(null);
  const defaultCashierOption = [
    {
      title: 'Novo Caixa',
      icon: 'add-circle-outline',
      action: () => navigate('Criar novo Caixa')
    }
  ]
  const [cashierOptions, setCashierOptions] = useState(defaultCashierOption)

  useEffect(() => {
    console.log("O useEffect foi chamado!");
    fetchCashierOptions()
  }, []);
  
  // O useFocusEffect é usado para re-executar a função fetchData sempre que a tela recebe foco
  useFocusEffect(
    React.useCallback(() => {
      // console.log("O useEffect foi chamado!");
      fetchData();
    }, [])
  );

  const fetchCashierOptions = async () => {
    try {
      const optionsString = await AsyncStorage.getItem('@cashiers');
      if (optionsString) {
        console.log(optionsString)
        // transformar string em objeto json
        setCashierOptions(JSON.parse(optionsString))
      } else {
        await AsyncStorage.setItem('@cashiers', `${JSON.stringify(defaultCashierOption)}`);
        console.log(JSON.stringify(defaultCashierOption))
      }
    } catch (error) {
      Alert.alert('Ops', 'Não foi possível carregar opções de caixa.');
      console.error(error);
    }

  }

  const fetchData = async () => {
    try {
      const response = await AsyncStorage.getItem(selectedCashier);
      // console.log(selectedCashier)
      setTransactions(JSON.parse(response));
    } catch (error) {
      Alert.alert('Ops', 'Não foi possível carregar as transações.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeleteTransaction = async (id) => {
    try {
      const transactionsWithoutDeletedOne = transactions.filter(
        (transaction) => transaction.id !== id
        );
        await AsyncStorage.setItem(
          selectedCashier,
          JSON.stringify(transactionsWithoutDeletedOne)
          );
          fetchData();
    } catch (error) {
      console.log(error);
      Alert.alert('Ops', 'Não foi possível deletar esta transação');
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      {/* Botões principais */}
      <View style={styles.topButtonsRow}>
        {/* Botão de nova transação */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={() => navigate('Nova transação', {selectedCashier: selectedCashier})}
        >
          <Feather name="dollar-sign" color="#4caf50" size={20} />
          <Text style={styles.buttonText}>Nova transação</Text>
        </TouchableOpacity>
        {/* Botão de troca de caixa */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={{...styles.button, borderColor: 'blue',}}
        >
          <PopupMenu options={cashierOptions}/>
          <Text style={{...styles.buttonText, color:'blue'}}>Caixa</Text>
        </TouchableOpacity>
      </View>
      

      <Text style={styles.balanceText}>SALDO ATUAL</Text>
      <Text style={{ ...styles.balanceText, color: 'black', fontSize: 36 }}>
        R${' '}
        {transactions
          ? transactions
              .reduce((accumulator, transaction) => accumulator + transaction.amount, 0)
              .toFixed(2)
          : '0.00'}
      </Text>

      <View style={styles.infoContainer}>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>RECEITAS</Text>
          <Text style={{ ...styles.infoValue, color: '#4caf50' }}>
            R${' '}
            {transactions
              ? transactions
                  .filter((transaction) => transaction.amount > 0)
                  .reduce((accumulator, value) => accumulator + value.amount, 0)
                  .toFixed(2)
              : '0.00'}
          </Text>
        </View>
        <View style={{ ...styles.infoBox, borderRightWidth:0}}>
          <Text style={styles.infoLabel}>DESPESAS</Text>
          <Text style={{ ...styles.infoValue, color: '#f44336' }}>
            R${' '}
            {Math.abs(
              transactions
                ? transactions
                    .filter((transaction) => transaction.amount < 0)
                    .reduce((accumulator, value) => accumulator + value.amount, 0)
                : 0
            ).toFixed(2)}
          </Text>
        </View>
      </View>

      {transactions && (
        <Text style={styles.transactionText}>Transações</Text>
      )}

      <ScrollView
        style={{ width: '100%' }}
        showsVerticalScrollIndicator={false}
      >
        {transactions &&
          transactions.map((transaction) => (
            <TouchableOpacity
              key={transaction.id}
              onLongPress={() => {
                Alert.alert(
                  `Excluir ${transaction.title}`,
                  'Deseja excluir esta transação?',
                  [
                    { text: 'Não' },
                    {
                      text: 'Sim',
                      onPress: () => handleDeleteTransaction(transaction.id),
                    },
                  ]
                );
              }}
            >
              <TransactionListItem
                id={transaction.id}
                title={transaction.title}
                amount={transaction.amount}
                created_at={transaction.created_at}
              />
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
};

export default TransactionsScreen;
