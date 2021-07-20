import React from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { styles } from '../components/Styles';
import { LOG_OUT } from '../features/UserSlice';

export const HomeScreen = () => {
    const dispatch = useDispatch();

    return (
      <View style={styles.layout}>
        <Text style={styles.title}>Home</Text>
        <Button title="Log Out" onPress={() => dispatch(LOG_OUT())} />
      </View>
    );
  };