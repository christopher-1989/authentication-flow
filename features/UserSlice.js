import React from "react";
import { createSlice } from "@reduxjs/toolkit";

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
      RESTORE_TOKEN: (state, action) => {
        state.userID = action.payload;
        console.log(state)
      }
    },
  })

export const isLoggedIn = state => state.user.loggedin;
export const isSigningOut = state => state.user.signingOut;
export const { toggleLoggedIn, RESTORE_TOKEN } = userSlice.actions;
export const userReducer = userSlice.reducer