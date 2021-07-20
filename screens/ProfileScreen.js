import React from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { styles } from '../components/Styles';


export const ProfileScreen = () => {
    const dispatch = useDispatch();

    return (
      <View style={styles.layout}>
        <Text style={styles.title}>Profile</Text>
        <Button title="Logout" onPress={() => dispatch(toggleLoggedIn())} />
      </View>
    );
  };
  