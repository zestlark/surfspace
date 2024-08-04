import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { colorcode } from "../scripts/colors";
import { auth, database, dbref, dbset, dbget, dbremove } from "../firebase/config";


export const saveNote = createAsyncThunk(
    "saveNote",
    async (note, thunkAPI) => {
        try {
            const userId = auth?.currentUser?.uid;
            if (!userId) {
                throw new Error("User not authenticated");
            }
            const newnoteobj = { id: Date.now(), text: note, time: Date.now() }
            const noteRef = dbref(database, `surfspace/users/${userId}/notes/${newnoteobj.id}`);
            await dbset(noteRef, newnoteobj);
            //thunkAPI.dispatch(addNotes(newnoteobj))
            return newnoteobj;
        } catch (error) {
            console.error("Failed to save note to Firebase:", error);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const deleteNote = createAsyncThunk(
    "deleteNote",
    async (noteId, thunkAPI) => {
        try {
            const userId = auth?.currentUser?.uid;
            if (!userId) {
                throw new Error("User not authenticated");
            }
            const noteRef = dbref(database, `surfspace/users/${userId}/notes/${noteId}`);
            await dbremove(noteRef) // Remove the note from Firebase
            return noteId;
        } catch (error) {
            console.error("Failed to delete note from Firebase:", error);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const getAllNotes = createAsyncThunk(
    "getAllNotes",
    async (_, thunkAPI) => {
        try {
            const userId = auth?.currentUser?.uid;
            if (!userId) {
                throw new Error("User not authenticated");
            }
            const notesRef = dbref(database, `surfspace/users/${userId}/notes`);
            const snapshot = await dbget(notesRef);
            const notes = snapshot.val() || [];
            return Object.values(notes);
        } catch (error) {
            console.error("Failed to get notes from Firebase:", error);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const appnotes = createSlice({
    name: 'appnotes',
    initialState: {
        notes: [],
        notesbigshowstate: false,
        newNote: false,
        notesbigshowColor: '',
        notesbigshowData: {}
    },
    reducers: {
        addNotes: (state, actions) => {
            if (actions.payload) {
                state.newNote = false;
                state.notes.unshift(actions.payload);
                console.log(actions.payload);

            }
            else {
                state.notesbigshowstate = true
                state.notesbigshowData = ''
                state.notesbigshowColor = colorcode[0]
                state.newNote = true
            }
        },
        // deletenotes: (state, actions) => {
        //     state.notes = state.notes.filter(item => item.id !== actions.payload)
        // },
        showNotesBig: (state, actions) => {
            state.notesbigshowstate = actions.payload.state
            state.notesbigshowColor = actions.payload.color
            state.notesbigshowData = actions.payload.data
            state.newNote = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveNote.fulfilled, (state, action) => {
                console.log("Note saved successfully");
                state.notes.unshift(action.payload);
                console.log(state.notes);

            })
            .addCase(saveNote.rejected, (state, action) => {
                console.error("Error saving note:", action.payload);
            })
            .addCase(getAllNotes.fulfilled, (state, action) => {
                state.notes = action.payload;
            })
            .addCase(getAllNotes.rejected, (state, action) => {
                console.error("Error getting notes:", action.payload);
            })
            .addCase(deleteNote.fulfilled, (state, action) => {
                state.notes = state.notes.filter(note => note.id !== action.payload);
            })
            .addCase(deleteNote.rejected, (state, action) => {
                console.error("Error deleting note:", action.payload);
            });
    }
})

export const { addNotes, deletenotes, showNotesBig } = appnotes.actions;

export default appnotes.reducer;