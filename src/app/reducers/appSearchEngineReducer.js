import { createSlice } from "@reduxjs/toolkit";
import { searchEngine } from "../scripts/searchEngine";
import { urlPattern } from "../scripts/urlCheckRegex";

export const appsearchEngine = createSlice({
    name: 'searchEngine',
    initialState: {
        selectedEngine: searchEngine['bing'],
    },
    reducers: {
        changeSearchEngine: (state, actions) => {
            state.selectedEngine = searchEngine[actions.payload]
        },

        searchPreProcess: (state, actions) => {
            const inputValue = actions.payload.trim();

            if (urlPattern.test(inputValue)) {
                //alert('Opening URL in new tab');
                const slantcheck = inputValue.split('://');

                if (slantcheck.length > 1) {
                    window.open(inputValue, '_blank');
                } else {
                    window.open('http://' + inputValue, '_blank');
                }
            } else {
                window.location.href = state.selectedEngine.starturl + inputValue;
            }
        }
    }
})

export const { changeSearchEngine, searchPreProcess } = appsearchEngine.actions;

export default appsearchEngine.reducer;