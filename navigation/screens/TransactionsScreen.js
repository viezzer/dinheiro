import React, { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import DateFilter from '../../components/DateFilter'; // Importe o componente
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
import 'dayjs/locale/pt-br';  // Importe a configuração regional para português brasileiro
import dayjs from 'dayjs';
dayjs.locale('pt-br');  // Configure a configuração regional
import { format, parse, subWeeks, subMonths , isAfter} from 'date-fns';

const TransactionsScreen = () => {
  const { navigate } = useNavigation();
  const [loading, setLoading] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState('@transactions-default');
  const [transactions, setTransactions] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all' | 'week' | 'month' | 'custom'
  
  // O useFocusEffect é usado para re-executar a função fetchData sempre que a tela recebe foco
  useFocusEffect(
    React.useCallback(() => {
      // console.log("O useEffect foi chamado!");
      fetchData();
    }, [filter])
  );

  const fetchData = async () => {
    try {
      const response = await AsyncStorage.getItem(selectedAccount);
      const allTransactions = JSON.parse(response);
      // Aplica o filtro de período, se necessário
      const filteredTransactions = applyFilter(allTransactions);
      setTransactions(filteredTransactions);
    } catch (error) {
      Alert.alert('Ops', 'Não foi possível carregar as transações.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilter = (allTransactions) => {
    const currentDate = dayjs();
    
    switch (filter) {
      case 'week':
        // Obtém a data da última semana
        const lastWeek = subWeeks(new Date(), 1);
        return allTransactions.filter((transaction) => {
          try {
            const formattedTransactionDate = format(parse(transaction.created_at, 'dd/MM/yyyy', new Date()), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
            const isAfterLastWeek = isAfter(parse(formattedTransactionDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", new Date()), lastWeek);
            if (isAfterLastWeek) {
              return transaction
            } 
          } catch (error) {
            console.error('Error formatting date:', error);
          }
        });
      case 'month':
        const lastMonth = subMonths(new Date(), 1);
        return allTransactions.filter((transaction) => {
          try {
            const formattedTransactionDate = format(parse(transaction.created_at, 'dd/MM/yyyy', new Date()), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
            const isAfterLastMonth = isAfter(parse(formattedTransactionDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", new Date()), lastMonth);
            if (isAfterLastMonth) {
              return transaction
            } 
          } catch (error) {
            console.error('Error formatting date:', error);
          }
          
        });
        break;
      case 'custom':
        // Implemente a lógica para filtrar transações com base em um período personalizado
        break;
      default:
        return allTransactions;
    }
  };
  
  const handleDeleteTransaction = async (id) => {
    try {
      const transactionsWithoutDeletedOne = transactions.filter(
        (transaction) => transaction.id !== id
        );
        await AsyncStorage.setItem(
          selectedAccount,
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
          onPress={() => navigate('Nova transação', {selectedAccount: selectedAccount})}
        >
          <Feather name="dollar-sign" color="#4caf50" size={20} />
          <Text style={styles.buttonText}>Nova transação</Text>
        </TouchableOpacity>
        {/* Botão de troca de caixa */}
        {/* <PopupMenu/> */}
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

    <DateFilter filter={filter} setFilter={setFilter}/>

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
