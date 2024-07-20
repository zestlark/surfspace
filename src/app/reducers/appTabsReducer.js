import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { database, dbref, dbset, dbget, auth, dbremove } from '../firebase/config';

// Thunk to add a tab and save it to the database
export const addTab = createAsyncThunk(
    'appTabs/addTab',
    async (tab, thunkAPI) => {
        try {
            const userId = auth?.currentUser?.uid; // Get the current user ID
            if (!userId) throw new Error("User not authenticated");

            // Ensure to invoke nanoid as a function to generate a unique ID
            const newtabobj = { id: nanoid(), url: tab.url, title: tab.title, icon: tab.icon };
            const newTabRef = dbref(database, `surfspace/users/${userId}/tabs/${newtabobj.id}`);
            await dbset(newTabRef, newtabobj);

            return newtabobj; // Return the tab object to update the state
        } catch (error) {
            console.error("Failed to add tab:", error);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Thunk to get all tabs from the database
export const getAllTabs = createAsyncThunk(
    'appTabs/getAllTabs',
    async (_, thunkAPI) => {
        try {
            const userId = auth?.currentUser?.uid; // Get the current user ID
            if (!userId) throw new Error("User not authenticated");

            const tabsRef = dbref(database, `surfspace/users/${userId}/tabs/`);
            const snapshot = await dbget(tabsRef);
            const data = snapshot.val();

            return data ? Object.values(data) : []; // Convert object to array
        } catch (error) {
            console.error("Failed to get tabs:", error);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Thunk to update a tab in the database
export const updateTab = createAsyncThunk(
    'appTabs/updateTab',
    async (tab, thunkAPI) => {
        try {
            const userId = auth?.currentUser?.uid; // Get the current user ID
            if (!userId) throw new Error("User not authenticated");

            const tabRef = dbref(database, `surfspace/users/${userId}/tabs/${tab.id}`);
            await dbset(tabRef, tab);

            return tab; // Return the updated tab object to update the state
        } catch (error) {
            console.error("Failed to update tab:", error);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const deleteTab = createAsyncThunk(
    'appTabs/deleteTab',
    async (tabId, thunkAPI) => {
        try {
            const userId = auth?.currentUser?.uid; // Get the current user ID
            if (!userId) throw new Error("User not authenticated");

            const tabRef = dbref(database, `surfspace/users/${userId}/tabs/${tabId}`);
            await dbremove(tabRef);

            return tabId; // Return the deleted tab ID to update the state
        } catch (error) {
            console.error("Failed to delete tab:", error);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const apptabs = createSlice({
    name: 'apptabs',
    initialState: {
        tabs: [],
        newtabpage: false,
        loaded: false,
    },
    reducers: {
        opennewtabpage: (state) => {
            state.newtabpage = true;
        },
        closenewtabpage: (state) => {
            state.newtabpage = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addTab.fulfilled, (state, action) => {
                state.tabs.push(action.payload);
            })
            .addCase(addTab.rejected, (state, action) => {
                console.error("Error adding tab:", action.payload);
            })
            .addCase(getAllTabs.fulfilled, (state, action) => {
                state.tabs = action.payload;
                state.loaded = true;
            })
            .addCase(getAllTabs.rejected, (state, action) => {
                console.error("Error fetching tabs:", action.payload);
            })
            .addCase(updateTab.fulfilled, (state, action) => {
                const index = state.tabs.findIndex(tab => tab.id === action.payload.id);
                if (index !== -1) {
                    state.tabs[index] = action.payload;
                }
            })
            .addCase(updateTab.rejected, (state, action) => {
                console.error("Error updating tab:", action.payload);
            })
            .addCase(deleteTab.fulfilled, (state, action) => {
                state.tabs = state.tabs.filter(tab => tab.id !== action.payload);
            })
            .addCase(deleteTab.rejected, (state, action) => {
                console.error("Error deleting tab:", action.payload);
            });

    }
});

export const { opennewtabpage, closenewtabpage } = apptabs.actions;

export default apptabs.reducer;
