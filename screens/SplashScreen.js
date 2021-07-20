import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../components/Styles';


export const SplashScreen = () => {
    return (
      <View style={styles.layout} >
        <Text style={styles.title}>Loading...</Text>
      </View>
    )
  }
  