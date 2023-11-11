import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import TransactionsScreen from './screens/TransactionsScreen';
import NewTransactionScreen from './screens/NewTransaction';
import ExpenseScreen from './screens/ExpenseScreen';
import CategoriesScreen from './screens/CategoriesScreen';

//Screen names
const transactionsName = "Transações";
const newTransactionName = "Nova transação"
const categoriesName = "Categorias";
const expenseName = "Despesas";

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
  
              } else if (rn == categoriesName) {
                iconName = focused ? 'bookmarks' : 'bookmarks-outline'
              }
  
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'green',
            tabBarInactiveTintColor: 'grey',
            tabBarLabelStyle: {fontSize: 12},
            tabBarStyle: { display: 'flex', height: 60, paddingTop:0},
            headerShown: true,
          })}
        >
  
          <Tab.Screen name={transactionsName} component={TransactionsScreen} />
          <Tab.Screen name={categoriesName} component={CategoriesScreen} />
          <Tab.Screen name={expenseName} component={ExpenseScreen} />
          <Tab.Screen 
            name={newTransactionName} 
            component={NewTransactionScreen}
            options={{
              tabBarButton: () => null, // Isso oculta o botão da barra de navegação inferior para esta tela
            }}
        />
  
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
  
  export default MainContainer;