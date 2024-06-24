import { createSlice } from "@reduxjs/toolkit";

export const overpage = createSlice({
    name: "overpage",
    initialState: {
        alertPageView: false,
        alertPageMesage: 'Welcome'
    }
    ,
    reducers: {
        appalert: (state, actions) => {
            state.alertPageMesage = actions.payload
            state.alertPageView = true;
        },
        appalertclose: (state, actions) => {
            state.alertPageView = false;
            state.alertPageMesage = ""
        }
    }
})

export const { appalert, appalertclose } = overpage.actions;

export default overpage.reducer;