import { configureStore } from '@reduxjs/toolkit';
import { globalSlice } from './slices/global';
import { landingSlice } from './slices/landing';

export const store = configureStore({
    reducer: {
        global: globalSlice.reducer,
        landing: landingSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
