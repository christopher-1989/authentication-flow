import React, { createContext, useContext, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { State } from 'react-native-gesture-handler';

// Our global authentication state, with default values
export const AuthContext = createContext({
  hasUser: false, 
  setUser: () => {},
});

const LoginScreen = ( { navigation }) => {
  const { setUser } = useContext(AuthContext);

  return (
    <View style={styles.layout}>
      <Text style={styles.title}>Login</Text>
      <Button title="Login" onPress={() => setUser(true)} />
      <Button title="Signup" onPress={() => navigation.navigate('Signup')} />
    </View>
  );
};

const SignUpScreen = () => {
  const { setUser } = useContext(AuthContext);

  return (
    <View style={styles.layout}>
      <Text style={styles.title}>Signup</Text>
      <Button title="Signup" onPress={() => setUser(true)} />
    </View>
  );
};

const ProfileScreen = () => {
  const { setUser } = useContext(AuthContext);

  return (
    <View style={styles.layout}>
      <Text style={styles.title}>Profile</Text>
      <Button title="Logout" onPress={() => setUser(false)} />
    </View>
  );
};

const HomeScreen = () => {
  const { setUser } = useContext(AuthContext);

  return (
    <View style={styles.layout}>
      <Text style={styles.title}>Home</Text>
      <Button title="Home" onPress={() => setUser(false)} />
    </View>
  );
};

const SettingsScreen = () => {
  const { setUser } = useContext(AuthContext);

  return (
    <View style={styles.layout}>
      <Text style={styles.title}>Settings</Text>
      <Button title="Settings" onPress={() => setUser(false)} />
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
  const { hasUser } = useContext(AuthContext);
  const state = {isLoading: false};

  if (state.isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator>
      {hasUser ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignUpScreen} />
        </>
      )}      
    </Stack.Navigator>
  );
};

const App = () => {
  // This is linked to our global authentication state.
  // We connect this in React to re-render components when changing this value.
  const [hasUser, setUser] = useState(false);

  return (
    <AuthContext.Provider value={{ hasUser, setUser }}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthContext.Provider>
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