// src/features/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const globalSlice = createSlice({
    name: 'global',
    initialState: {
        isOnLandingPage: true
    },
    reducers: {
        setIsOnLandingPage: (state, action) => {
            state.isOnLandingPage = action.payload;
        }
    }
});

// Export the actions to use in components
export const { setIsOnLandingPage } = globalSlice.actions;
