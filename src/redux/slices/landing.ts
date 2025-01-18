// src/features/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const landingSlice = createSlice({
    name: 'landing',
    initialState: {
        isHoveringButton: false,
        isExited: false,
        isExiting: false
    },
    reducers: {
        setIsHoveringButton: (state, action) => {
            state.isHoveringButton = action.payload;
        },
        setIsExited: (state, action) => {
            state.isExited = action.payload;
        },
        setIsExiting: (state, action) => {
            state.isExiting = action.payload;
        }
    }
});

// Export the actions to use in components
export const { setIsHoveringButton, setIsExited, setIsExiting } = landingSlice.actions;
