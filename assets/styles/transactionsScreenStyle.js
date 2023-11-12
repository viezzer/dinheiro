import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    topButtonsRow: {
        width:'100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',

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

  export default styles;