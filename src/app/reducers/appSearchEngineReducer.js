import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchEngine } from "../scripts/searchEngine";
import { urlPattern } from "../scripts/urlCheckRegex";
import { auth, database, dbref, dbset, dbget } from "../firebase/config";


export const saveSearchEngine = createAsyncThunk(
    "saveSearchEngine",
    async (_, thunkAPI) => {
        try {
            const userId = auth?.currentUser?.uid;
            if (!userId) {
                throw new Error("User not authenticated");
            }
            const selectedEngine = thunkAPI.getState().appSearchEngine.selectedEngine.name;
            const settingsRef = dbref(database, `surfspace/users/${userId}/settings/searchEngine`);
            await dbset(settingsRef, selectedEngine);
            console.log('done');
            return true;
        } catch (error) {
            console.error("Failed to save settings to Firebase:", error);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const getSearchEngine = createAsyncThunk(
    "getSearchEngine",
    async (_, thunkAPI) => {
        try {
            const userId = auth?.currentUser?.uid;
            if (!userId) {
                throw new Error("User not authenticated");
            }
            const settingsRef = dbref(database, `surfspace/users/${userId}/settings/searchEngine`);
            const snapshot = await dbget(settingsRef);
            const engineName = snapshot.val();
            return searchEngine[engineName] || searchEngine['google'];
        } catch (error) {
            console.error("Failed to get settings from Firebase:", error);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const appsearchEngine = createSlice({
    name: 'searchEngine',
    initialState: {
        selectedEngine: searchEngine['google'],
    },
    reducers: {
        changeSearchEngine: (state, actions) => {
            state.selectedEngine = searchEngine[actions.payload];
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveSearchEngine.fulfilled, (state, action) => {
                console.log("Settings saved successfully");
            })
            .addCase(saveSearchEngine.rejected, (state, action) => {
                console.error("Error saving settings:", action.payload);
            })
            .addCase(getSearchEngine.fulfilled, (state, action) => {
                state.selectedEngine = action.payload
            })
            .addCase(getSearchEngine.rejected, (state, action) => {
                console.error("Error getting settings:", action.payload);
            });
    }
})

export const { changeSearchEngine, searchPreProcess } = appsearchEngine.actions;

export default appsearchEngine.reducer;