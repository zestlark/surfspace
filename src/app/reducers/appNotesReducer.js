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
        ],
        notesbigshowstate: false,
        notesbigshowColor: '',
        notesbigshowData: {}
    },
    reducers: {
        addNotes: (state, actions) => {
            if (actions.payload)
                state.notes.unshift({ id: nanoid(), text: actions.payload, time: Date.now() });
        },
        deletenotes: (state, actions) => {
            state.notes = state.notes.filter(item => item.id !== actions.payload)
        },
        showNotesBig: (state, actions) => {
            state.notesbigshowstate = actions.payload.state
            state.notesbigshowColor = actions.payload.color
            state.notesbigshowData = actions.payload.data
        }
    }
})

export const { addNotes, deletenotes, showNotesBig } = appnotes.actions;

export default appnotes.reducer;