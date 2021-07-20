
import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
      userToken: null,
      signingOut: false,
    },
    reducers: {
      RESTORE_TOKEN: (state, action) => {
        state.userToken = action.payload.token;
        //state.isLoading = false,
      },
      SIGN_IN: (state, action) => {
          state.isSigningOut = false;
          state.userToken = action.payload.token;
      },
      LOG_OUT: (state) => {
        state.userToken = null;
        state.signingOut = true;

      }
    },
  })

export const isLoggedIn = state => state.user.userToken;
export const isSigningOut = state => state.user.signingOut;
export const { RESTORE_TOKEN, SIGN_IN, LOG_OUT } = userSlice.actions;
export const userReducer = userSlice.reducer