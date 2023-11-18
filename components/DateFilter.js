import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const DateFilter = ({ filter, setFilter }) => {
  return (
    <View style={styles.container}>
      <Picker
        style={styles.picker}
        selectedValue={filter}
        onValueChange={(itemValue) => setFilter(itemValue)}
      >
        <Picker.Item label="Todas as Transações" value="all" />
        <Picker.Item label="Última Semana" value="week" />
        <Picker.Item label="Último Mês" value="month" />
        {/* Adicione mais opções conforme necessário */}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        width: '97%',
        marginHorizontal: 10,
        height: 60,
    },
    picker: {
        backgroundColor: 'gainsboro',
        height: 40,
        borderWidth: 1,

    },
  });

export default DateFilter;
