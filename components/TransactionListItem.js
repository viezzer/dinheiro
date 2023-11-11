import React from "react";
import { Text, View, StyleSheet } from "react-native";

const TransactionListItem = ({ id = "", title = "", amount = 0, created_at = "" }) => {
  const operator = amount < 0 ? "-" : "+";
  const amountWithoutOperator = Math.abs(amount);

  const containerStyles = [
    styles.container,
    amount < 0 ? styles.borderMinus : styles.borderPlus,
  ];

  const amountTextStyles = [
    styles.amountText,
    amount < 0 ? styles.amountMinus : styles.amountPlus,
  ]

  return (
    <View style={containerStyles}>
        {title && <Text style={styles.titleText}>{title}</Text>}
        <View>
            <Text>{created_at}</Text>
            <Text style={amountTextStyles}>
            {operator} R$ {amountWithoutOperator.toFixed(2)}
            </Text>
        </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal:5,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: 'space-between',
  },
  borderMinus: {
    borderRightWidth: 4,
    borderBottomWidth: 2,
    borderColor: "#FF5733", // Cor para valores negativos
  },
  borderPlus: {
    borderRightWidth: 4,
    borderBottomWidth: 2,
    borderColor: "#4CAF50", // Cor para valores positivos
  },
  amountText: {
    fontWeight: "bold",
  },
  amountMinus: {
    color: '#FF5733',
  },
  amountPlus: {
    color: "#4CAF50",
  },
  titleText: {
    // borderTopWidth: 1,
    borderColor: "#D3D3D3",
    paddingTop: 5,
    fontSize:16,
  },
});

export default TransactionListItem;
