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
    },
  })

export const isLoggedIn = state => state.user.loggedin;
export const isSigningOut = state => state.user.signingOut;
export const { toggleLoggedIn } = userSlice.actions;
export const userReducer = userSlice.reducer