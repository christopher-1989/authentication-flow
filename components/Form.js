import React from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import { styles } from "./Styles";

export const TextField = ({ label, ...props }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.textfield}
      placeholderTextColor="#828282"
      {...props}
    />
  </View>
);

export const ErrorText = ({ text = "" }) => (
  <Text style={styles.errorText}>{text}</Text>
);