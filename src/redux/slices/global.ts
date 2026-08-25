// src/features/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { shouldSkipLanding } from '../../hashRouting';

export const globalSlice = createSlice({
    name: 'global',
    initialState: {
        isOnLandingPage: !shouldSkipLanding,
        containerSizeEstablished: false
    },
    reducers: {
        setIsOnLandingPage: (state, action) => {
            state.isOnLandingPage = action.payload;
        },
        setContainerSizeEstablished: (state, action) => {
            state.containerSizeEstablished = action.payload;
        }
    }
});

// Export the actions to use in components
export const { setIsOnLandingPage, setContainerSizeEstablished } = globalSlice.actions;
