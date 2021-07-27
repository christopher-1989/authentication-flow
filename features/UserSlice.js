import { createSlice } from "@reduxjs/toolkit";
import * as SecureStore from 'expo-secure-store';

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

async function remove(key) {
  await SecureStore.deleteItemAsync(key);
}

export const userSlice = createSlice({
    name: 'user',
    initialState: {
      userToken: null,
      signingOut: false,
    },
    reducers: {
      RESTORE_TOKEN: (state, action) => {
        state.userToken = action.payload.userToken;
      },
      SAVE_TOKEN : (state, action) => {
        console.log(action.payload);
        state.userToken = action.payload.userToken;
      },
      SIGN_IN: (state, action) => {
        state.isSigningOut = false;
        state.userToken = action.payload.userToken;
        save('userToken', state.userToken);
        },
      LOG_OUT: (state) => {
        state.userToken = null;
        remove('userToken');
        state.signingOut = true;
      }
    },
  })

export const isLoggedIn = state => state.user.userToken;
export const isSigningOut = state => state.user.signingOut;
export const { RESTORE_TOKEN, SAVE_TOKEN, SIGN_IN, LOG_OUT } = userSlice.actions;
export const userReducer = userSlice.reducer