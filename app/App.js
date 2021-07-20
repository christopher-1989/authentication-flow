import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { CreateAccount } from '../screens/CreateAccountScreen';
import { SignIn } from '../screens/SignInScreen';
import { store } from './store';
import { isSigningOut, isLoggedIn } from '../features/UserSlice';
import { isLoading } from '../features/LoadingSlice';
import { ProfileScreen } from '../screens/ProfileScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { SplashScreen } from '../screens/SplashScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { SecureStore } from 'expo-secure-store';
import { RESTORE_TOKEN } from '../features/UserSlice';


const Stack = createStackNavigator();
export const AppNavigator = () => {
  const dispatch = useDispatch();

  
  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        console.log('trying to restore from securestore');
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }
      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch(RESTORE_TOKEN({token: userToken }));
    };

    bootstrapAsync();
  }, []);

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
  

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;