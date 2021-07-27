import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    layout: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 32,
      marginBottom: 16,
    },
    cardContainer: {
      marginTop: '40%',
      flexDirection: 'row',
    },
    pressable: {
      justifyContent: 'center',
      backgroundColor: '#0b925e',
      height: 125,
      width: 125,
      margin: 10,
    },
    pressableText: {
      fontWeight: "500",
      fontSize: 30,
      color: "#ffe",
      textAlign: 'center'
    },
    button: {
      backgroundColor: "#0b925e",
      paddingVertical: 10,
      paddingHorizontal: 45,
      alignItems: "center",
      marginHorizontal: 20
    },
    buttonLoading: {
      backgroundColor: "#E58E8D"
    },
    text: {
      fontWeight: "500",
      fontSize: 18,
      color: "#fff"
    },
    row: {
      marginHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: "#E4E4E4",
      marginBottom: 11
    },
    label: {
      color: "#4A4A4A",
      fontSize: 18,
      fontWeight: "600",
      marginBottom: 7
    },
    textfield: {
      fontSize: 18,
      fontWeight: "400",
      color: "#828282",
      marginBottom: 4
    },
    errorText: {
      color: "red",
      fontSize: 16,
      marginTop: 5,
      marginBottom: 15,
      marginHorizontal: 20
    },
  });