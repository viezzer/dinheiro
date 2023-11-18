import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native'
// Screens
import TransactionsScreen from './screens/TransactionsScreen';
import NewTransactionScreen from './screens/NewTransaction';
// import CreateNewCashier from './screens/CreateNewCashier'
// import ExpenseScreen from './screens/ExpenseScreen';
// import CategoriesScreen from './screens/CategoriesScreen';

//Screen names
const transactionsName = "Transações";
const newTransactionName = "Nova transação"
// const createNewCashier = "Criar novo Caixa"
// const categoriesName = "Categorias";
// const expenseName = "Despesas";

//options
const HeaderOptions = (title, navigation) => ({
  headerStyle: {
    backgroundColor: '#d7d7d7', // Cor de fundo do cabeçalho
  },
  headerTintColor: 'black', // Cor do texto do cabeçalho
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  title: title, // Título da tela
  headerLeft: () => (
    title != transactionsName &&
    <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
      <Ionicons name="arrow-back" size={24} color="black" />
    </TouchableOpacity>
  ),
});

const Tab = createBottomTabNavigator();

function MainContainer() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName={transactionsName}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              let rn = route.name;
  
              if (rn === transactionsName) {
                iconName = focused ? 'home' : 'home-outline';
  
              } else if (rn == newTransactionName) {
                iconName = focused ? 'add' : 'add-outline'
              }
  
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'green',
            tabBarInactiveTintColor: 'grey',
            tabBarLabelStyle: {fontSize: 12},
            tabBarStyle: { 
              display: 'flex', 
              height: 60, 
              paddingTop:0,
            },
            headerShown: true,
          })}
        >
  
          <Tab.Screen 
            name={transactionsName} 
            component={TransactionsScreen} 
            options={({ navigation }) => HeaderOptions(transactionsName, navigation)}
          />
          <Tab.Screen 
            name={newTransactionName} 
            component={NewTransactionScreen}
            options={({ navigation }) => HeaderOptions(newTransactionName, navigation)}
            />
  
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
  
  export default MainContainer;