import React, { useEffect, useState, useCallback } from 'react';
import Loading from '../../components/Loading'
import TransactionListItem from '../../components/TransactionListItem';
import {
  ScrollView,
  Text,
  View,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Feather } from 'react-native-vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'row',
    height: 55,
    paddingHorizontal: 16,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#4caf50',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'green',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  balanceText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
  },
  infoContainer: {
    flexDirection: 'row',
    backgroundColor: '#d7d7d7',
    padding: 16,
    marginVertical: 16,
    justifyContent: 'space-around',
    width: '80%',
    borderRadius: 8,
  },
  infoBox: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: '#bdbdbd',
    alignItems: 'center',
  },
  infoLabel: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoValue: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  transactionText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    borderBottomWidth: 0.5,
    borderBottomColor: '#d7d7d7',
    paddingBottom: 8,
    marginTop: 8,
    marginBottom: 10,
    width: '100%',
    textAlign: 'center',
  },
});

const TransactionsScreen = () => {
  const { navigate } = useNavigation();
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);
  
  // O useFocusEffect é usado para re-executar a função fetchData sempre que a tela recebe foco
  useFocusEffect(
    React.useCallback(() => {
      // console.log("O useEffect foi chamado!");
      fetchData();
    }, [])
  );

  const fetchData = async () => {
    try {
      const response = await AsyncStorage.getItem('@transactions');
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
        '@transactions',
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
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.button}
        onPress={() => navigate('Nova transação')}
      >
        <Feather name="dollar-sign" color="#4caf50" size={20} />
        <Text style={styles.buttonText}>Nova transação</Text>
      </TouchableOpacity>

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
