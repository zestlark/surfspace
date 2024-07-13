import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const appAuthSignup = createAsyncThunk('appAuthSignup', async (name, username, password) => {

})

export const appAuth = createSlice({
    name: 'appAuth',
    initialState: {
        authPage: false,
    },
    reducers: {
        openAuthPage: (state, actions) => {
            state.authPage = true;
        },
        closeAuthPage: (state, actions) => {
            state.authPage = false;
        }
    }
})

export const { openAuthPage, closeAuthPage } = appAuth.actions;

export default appAuth.reducer;