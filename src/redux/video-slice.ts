import { createSlice } from '@reduxjs/toolkit';

type PlayerState = {
    currentPlayerTime: number,
    maxPlayerTime: number
}

const initialState:PlayerState = {
    currentPlayerTime: 0,
    maxPlayerTime: 0
};


const playerSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setCurrentPlayerTime: (state, action) => {
            state.currentPlayerTime = action.payload
        },
        setMaxPlayerTime: (state, action) => {
            state.maxPlayerTime = action.payload
        },
    },
});

export const { setCurrentPlayerTime, setMaxPlayerTime } = playerSlice.actions;
export default playerSlice.reducer;
