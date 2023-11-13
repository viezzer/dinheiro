import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 16,
      paddingTop: 40,
    },
    cabecalho: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    headerText: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: 30,
    },
    label: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: 16,
      marginTop: 8,
    },
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    switchLabel: {
      fontWeight: 'bold',
      fontSize: 20,
      marginLeft: 20,
    },
    input: {
      height: 48,
      paddingLeft: 16,
      borderRadius: 8,
      marginTop: 8,
      backgroundColor: '#575757',
      color: 'white',
      borderWidth: 2,
      borderColor: '#4caf50',
    },
    button: {
      height: 56,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#4caf50',
      borderRadius: 8,
      marginTop: 24,
    },
    buttonText: {
      fontWeight: 'bold',
      fontSize: 16,
      color: 'white',
      marginLeft: 8,
    },
  });

export default styles;