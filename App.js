import React, { createContext, useContext, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, useSelector } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { CreateAccount } from './screens/CreateAccount';
import { SignIn } from './screens/SignIn';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    loggedin: false,
    userID: null,
    signingOut: false,
  },
  reducers: {
    toggleLoggedIn: (state) => {
      state.loggedin = !state.loggedin
    },
  },
})

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    loading: false
  },
  reducers: {
    toggleLoadingStatus: (state) => {
      state.loading = !state.loading
    }
  }
})

export const isLoggedIn = state => state.user.loggedin;
export const isSigningOut = state => state.user.signingOut;
export const { toggleLoggedIn } = userSlice.actions;

export const isLoading = state => state.loading.loading;
export const { toggleLoadingStatus } = loadingSlice.actions;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    loading: loadingSlice.reducer,
  }
})

const LoginScreen = ( { navigation } ) => {

  return (
    <View style={styles.layout}>
      <Text style={styles.title}>Login</Text>
      <Button title="Login" onPress={() => store.dispatch(toggleLoggedIn())} />
      <Button title="Signup" onPress={() => navigation.navigate('CreateAccount')} />
    </View>
  );
};

const SignUpScreen = () => {

  return (
    <View style={styles.layout}>
      <Text style={styles.title}>Signup</Text>
      <Button title="Signup" onPress={() => store.dispatch(toggleLoggedIn())} />
    </View>
  );
};

const ProfileScreen = () => {

  return (
    <View style={styles.layout}>
      <Text style={styles.title}>Profile</Text>
      <Button title="Logout" onPress={() => store.dispatch(toggleLoggedIn())} />
    </View>
  );
};

const HomeScreen = () => {

  return (
    <View style={styles.layout}>
      <Text style={styles.title}>Home</Text>
      <Button title="Log Out" onPress={() => store.dispatch(toggleLoggedIn())} />
    </View>
  );
};

const SettingsScreen = () => {

  return (
    <View style={styles.layout}>
      <Text style={styles.title}>Settings</Text>
      <Button title="Settings" onPress={() => store.dispatch(toggleLoggedIn())} />
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
  const loginStatus = useSelector(isLoggedIn);
  const loadingStatus = useSelector(isLoading);
  const signOutStatus = useSelector(isSigningOut);

  if (loadingStatus) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator>
      {loginStatus ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="CreateAccount" component={CreateAccount} />

          <Stack.Screen name="Login" component={SignIn} options={{
            title: 'Sign in',
            // When logging out, a pop animation feels intuitive
            // You can remove this if you want the default 'push' animation
            animationTypeForReplace: signOutStatus ? 'pop' : 'push',
          }} />
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