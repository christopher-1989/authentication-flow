import { createSlice } from '@reduxjs/toolkit';

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
  
  
  
export const isLoading = state => state.loading.loading;
export const { toggleLoadingStatus } = loadingSlice.actions;
export const loadingReducer = loadingSlice.reducer;