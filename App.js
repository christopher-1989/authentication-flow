import React, { createContext, useContext, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, useSelector } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';

// Our global authentication state, with default values
export const AuthContext = createContext({
  hasUser: false, 
  setUser: () => {},
});

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    hasUser: false,
  },
  reducers: {
    user: (state) => {
      console.log(state);
      state.hasUser = !state.hasUser
    },
  },
})

export const checkUser = state => state.hasUser;
export const { user } = userSlice.actions;


export const store = configureStore({
  reducer: userSlice.reducer,
})

const LoginScreen = ( { navigation }) => {

  return (
    <View style={styles.layout}>
      <Text style={styles.title}>Login</Text>
      <Button title="Login" onPress={() => store.dispatch(user())} />
      <Button title="Signup" onPress={() => navigation.navigate('Signup')} />
    </View>
  );
};

const SignUpScreen = () => {

  return (
    <View style={styles.layout}>
      <Text style={styles.title}>Signup</Text>
      <Button title="Signup" onPress={() => store.dispatch(user())} />
    </View>
  );
};

const ProfileScreen = () => {

  return (
    <View style={styles.layout}>
      <Text style={styles.title}>Profile</Text>
      <Button title="Logout" onPress={() => store.dispatch(user())} />
    </View>
  );
};

const HomeScreen = () => {

  return (
    <View style={styles.layout}>
      <Text style={styles.title}>Home</Text>
      <Button title="Home" onPress={() => store.dispatch(user())} />
    </View>
  );
};

const SettingsScreen = () => {

  return (
    <View style={styles.layout}>
      <Text style={styles.title}>Settings</Text>
      <Button title="Settings" onPress={() => store.dispatch(user())} />
    </View>
  );
};

const SplashScreen = () => {
  return (
    <View style={styles.layout} >
      <Text style={styles.title}>Loading...</Text>
    </View>
  )
}

const Stack = createStackNavigator();

export const AppNavigator = () => {
  const state = {isLoading: false, isSignout: false};
  const check = useSelector(checkUser);

  console.log(check);
  if (state.isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator>
      {check ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} options={{
            title: 'Sign in',
            // When logging out, a pop animation feels intuitive
            // You can remove this if you want the default 'push' animation
            animationTypeForReplace: state.isSignout ? 'pop' : 'push',
          }} />
          <Stack.Screen name="Signup" component={SignUpScreen} />
        </>
      )}      
    </Stack.Navigator>
  );
};

const App = () => {
  // This is linked to our global authentication state.
  // We connect this in React to re-render components when changing this value.
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
  },
});