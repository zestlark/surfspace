import { createSlice, nanoid } from "@reduxjs/toolkit";

export const appHistory = createSlice({
    name: "appHistory",
    initialState: {
        history: [{ id: nanoid(), search: 'zestlark', time: '2024-05-15' }]
    }
    , reducers: {
        addAppHistory: (state, actions) => {
            state.history.unshift({ id: nanoid(), search: actions.payload, time: Date.now() })
        },
        deleteAppHistory: (state, actions) => {
            state.history = state.history.filter(item => item.id !== actions.payload)
        }
    }
})

export const { addAppHistory, deleteAppHistory } = appHistory.actions

export default appHistory.reducer;