import { createSlice } from "@reduxjs/toolkit";

export const overpage = createSlice({
    name: "overpage",
    initialState: {
        alertPageView: false,
        alertPageMesage: 'Welcome',
        confirmPageView: false,
        confirmPageMesage: 'Are you sure?',
        confirmButtonClickFunction: ''
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
        },
        appconfirm: (state, actions) => {
            state.confirmPageMesage = actions.payload.message
            state.confirmPageView = true;
            state.confirmButtonClickFunction = actions.payload.confirmFunction
        },
        appconfirmclose: (state, actions) => {
            state.confirmPageView = false;
            state.confirmPageMesage = ""
            state.confirmButtonClickFunction = ''
        }
    }
})

export const { appalert, appalertclose, appconfirm, appconfirmclose } = overpage.actions;

export default overpage.reducer;