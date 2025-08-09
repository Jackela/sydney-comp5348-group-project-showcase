// store/slices/TotalSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TotalState {
    value: number;
}

const initialState: TotalState = {
    value: 0,
};

const totalSlice = createSlice({
    name: 'total',
    initialState,
    reducers: {
        setTotal(state, action: PayloadAction<number>) {
            state.value = action.payload;
        },
        clearTotal(state) {
            state.value = 0;
        },
    },
});

export const { setTotal, clearTotal } = totalSlice.actions;

export default totalSlice.reducer;
