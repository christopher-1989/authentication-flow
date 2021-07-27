import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { styles } from "./Styles";

export const Button = ({ text, onPress, disabled = false, style = {} }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.button, disabled && styles.buttonLoading, style]}
    disabled={disabled}
  >
    <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>
);