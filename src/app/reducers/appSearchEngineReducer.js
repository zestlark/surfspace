import { createSlice } from "@reduxjs/toolkit";
import { searchEngine } from "../scripts/searchEngine";

export const appsearchEngine = createSlice({
    name: 'searchEngine',
    initialState: {
        selectedEngine: searchEngine['google'],
    },
    reducers: {
        changeSearchEngine: (state, actions) => {
            // state.selectedEngine = searchEngine[actions.payload]
        },
    }
})

export const { changeSearchEngine } = appsearchEngine.actions;

export default appsearchEngine.reducer;