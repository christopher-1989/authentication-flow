import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../features/UserSlice";
import { loadingReducer } from "../features/LoadingSlice";

export const store = configureStore({
    reducer: {
      user: userReducer,
      loading: loadingReducer,
    }
})