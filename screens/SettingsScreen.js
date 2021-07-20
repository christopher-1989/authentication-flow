import React from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { styles } from '../components/Styles';


export const SettingsScreen = () => {
    const dispatch = useDispatch();

    return (
      <View style={styles.layout}>
        <Text style={styles.title}>Settings</Text>
        <Button title="Settings" onPress={() => dispatch(toggleLoggedIn())} />
      </View>
    );
  };