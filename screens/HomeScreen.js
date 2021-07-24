import React from 'react';
import { View, Text, Button, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import { styles } from '../components/Styles';
import { LOG_OUT } from '../features/UserSlice';

export const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    return (
      <View style={styles.layout}>
        <Text style={[styles.title, {marginTop: '-50%'}]}>Select a screen to view</Text>
        <View style={styles.cardContainer}>
          <Pressable style={styles.pressable} onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.pressableText}>Profile</Text>
          </Pressable>
          <Pressable style={styles.pressable} onPress={() => navigation.navigate('Settings')}>
            <Text style={styles.pressableText}>Settings</Text>
          </Pressable>
        </View>
        <Button title="Log Out" onPress={() => dispatch(LOG_OUT())} />
      </View>
    );
  };