import { createSlice, nanoid } from "@reduxjs/toolkit";

export const appnotes = createSlice({
    name: 'appnotes',
    initialState: {
        notes: [
            { id: nanoid(), text: 'lorem Ips incorrectly formatted', time: Date.now() },
            { id: nanoid(), text: 'lorem Ips incorrectly formatted', time: Date.now() },
            { id: nanoid(), text: 'lorem Ips incorrectly formatted', time: Date.now() },
            { id: nanoid(), text: 'lorem Ips incorrectly formatted', time: Date.now() },
            { id: nanoid(), text: 'lorem Ips incorrectly formatted', time: Date.now() }
        ]
    },
    reducers: {
        addNotes: (state, actions) => {
            state.notes.unshift({ id: nanoid(), text: actions.payload, time: Date.now() });
        },
        deletenotes: (state, actions) => {
            state.notes = state.notes.filter(item => item.id !== actions.payload)
        }
    }
})

export const { addNotes, deletenotes } = appnotes.actions;

export default appnotes.reducer;