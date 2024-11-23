// src/features/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const landingSlice = createSlice({
    name: 'landing',
    initialState: {
        isHoveringButton: false
    },
    reducers: {
        setIsHoveringButton: (state, action) => {
            state.isHoveringButton = action.payload;
        }
    }
});

// Export the actions to use in components
export const { setIsHoveringButton } = landingSlice.actions;
