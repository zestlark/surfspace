import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, database, dbref, dbset, dbget, dbremove } from "../firebase/config";

// Thunk to save application history
export const saveAppHistory = createAsyncThunk(
    "appHistory/saveAppHistory",
    async (history, thunkAPI) => {
        try {
            const userId = auth?.currentUser?.uid;
            if (!userId) {
                throw new Error("User not authenticated");
            }
            const newHistoryObj = { id: nanoid(), search: history, time: Date.now() }
            const historyRef = dbref(database, `surfspace/users/${userId}/history/${newHistoryObj.id}`);
            await dbset(historyRef, newHistoryObj);
            return newHistoryObj;
        } catch (error) {
            console.error("Failed to save history to Firebase:", error);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const deleteAppHistoryThunk = createAsyncThunk(
    "appHistory/deleteAppHistory",
    async (id, thunkAPI) => {
        try {
            const userId = auth?.currentUser?.uid;
            if (!userId) {
                throw new Error("User not authenticated");
            }
            const historyRef = dbref(database, `surfspace/users/${userId}/history/${id}`);
            await dbremove(historyRef);
            return id; // Return the ID to update the Redux state
        } catch (error) {
            console.error("Failed to delete history from Firebase:", error);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Thunk to get all application history
export const getAllHistory = createAsyncThunk(
    "appHistory/getAllHistory",
    async (_, thunkAPI) => {
        try {
            const userId = auth?.currentUser?.uid;
            if (!userId) {
                throw new Error("User not authenticated");
            }
            const historyRef = dbref(database, `surfspace/users/${userId}/history/`);
            const snapshot = await dbget(historyRef);
            const history = snapshot.val();
            return history ? Object.values(history) : [];
        } catch (error) {
            console.error("Failed to get history from Firebase:", error);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Redux slice for application history
export const appHistory = createSlice({
    name: "appHistory",
    initialState: {
        history: []
    },
    reducers: {
        deleteAppHistory: (state, action) => {
            state.history = state.history.filter(item => item.id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveAppHistory.fulfilled, (state, action) => {
                console.log("History saved successfully");
                state.history.unshift(action.payload);
            })
            .addCase(saveAppHistory.rejected, (state, action) => {
                console.error("Error saving history:", action.payload);
            })
            .addCase(getAllHistory.fulfilled, (state, action) => {
                state.history = action.payload;
            })
            .addCase(getAllHistory.rejected, (state, action) => {
                console.error("Error getting history:", action.payload);
            })
            .addCase(deleteAppHistoryThunk.fulfilled, (state, action) => {
                console.log("History deleted successfully");
                state.history = state.history.filter(item => item.id !== action.payload);
            })
            .addCase(deleteAppHistoryThunk.rejected, (state, action) => {
                console.error("Error deleting history:", action.payload);
            });
    }
});

export const { addAppHistory, deleteAppHistory } = appHistory.actions;

export default appHistory.reducer;
