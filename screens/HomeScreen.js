import React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from '../components/Styles';
import { LOG_OUT } from '../features/UserSlice';
import { userName } from '../features/UserSlice';

export const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    return (
      <View style={styles.layout}>
        <Text style={styles.title}>{`Welcome ${useSelector(userName)}`}</Text>
        <Text style={{fontSize: 22, paddingTop: 20}}>Select a screen to view</Text>
        <View style={[styles.cardContainer, {marginTop: 20}]}>
          <TouchableOpacity style={styles.pressable} onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.pressableText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pressable} onPress={() => navigation.navigate('Settings')}>
            <Text style={styles.pressableText}>Settings</Text>
          </TouchableOpacity>
        </View>
        <Button title="Log Out" onPress={() => dispatch(LOG_OUT())} />
      </View>
    );
  };