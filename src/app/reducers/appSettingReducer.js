import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, database, dbref, dbset, dbget } from "../firebase/config";

export const setSettingData = createAsyncThunk(
    "setSettingData",
    async (_, thunkAPI) => {
        try {
            const userId = auth?.currentUser?.uid;

            if (!userId) {
                throw new Error("User not authenticated");
            }
            const background = thunkAPI.getState().appSetting.selectedBackgroundImageStyleName;
            const settingsRef = dbref(database, `surfspace/users/${userId}/settings/background`);
            await dbset(settingsRef, background);
            return true;
        } catch (error) {
            console.error("Failed to save settings to Firebase:", error);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const getSettingData = createAsyncThunk(
    "getSettingData",
    async (_, thunkAPI) => {
        try {
            const userId = auth?.currentUser?.uid;

            if (!userId) {
                throw new Error("User not authenticated");
            }

            const settingsRefBackground = dbref(database, `surfspace/users/${userId}/settings/background`);
            const settingsRefTheme = dbref(database, `surfspace/users/${userId}/settings/theme`);

            const snapshotBackground = await dbget(settingsRefBackground);
            const background = snapshotBackground.exists() ? snapshotBackground.val() : null;

            const snapshotTheme = await dbget(settingsRefTheme);
            const theme = snapshotTheme.exists() ? snapshotTheme.val() : 'light'; // Default theme if not found

            const data = {
                background,
                theme
            };

            return data;
        } catch (error) {
            console.error("Failed to get settings from Firebase:", error);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const saveTheme = createAsyncThunk(
    "saveTheme",
    async (theme, thunkAPI) => {
        try {
            const userId = auth?.currentUser?.uid;
            if (!userId) {
                throw new Error("User not authenticated");
            }
            const settingsRef = dbref(database, `surfspace/users/${userId}/settings/theme`);
            await dbset(settingsRef, theme);
            return theme;
        } catch (error) {
            console.error("Failed to save theme to Firebase:", error);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const appSetting = createSlice({
    name: 'setting',
    initialState: {
        location: {
            country: '',
            timezone: '',
            regionName: '',
            countryCode: ''
        },
        background: {
            style9:{
                BodyImageUrl:"https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=600"
            },
            style10:{
                BodyImageUrl:"https://images.pexels.com/photos/1324803/pexels-photo-1324803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            },
            style11:{
                BodyImageUrl:"https://images.pexels.com/photos/772429/pexels-photo-772429.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            },
            style1: {
                BodyImageUrl: 'https://images.pexels.com/photos/421788/pexels-photo-421788.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            },
            style2: {
                BodyImageUrl: 'https://images.pexels.com/photos/691668/pexels-photo-691668.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            },
            style5: {
                BodyImageUrl: 'https://images.pexels.com/photos/1423601/pexels-photo-1423601.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            },
            style6: {
                BodyImageUrl: 'https://images.pexels.com/photos/985266/pexels-photo-985266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            },
            style7: {
                BodyImageUrl: 'https://images.pexels.com/photos/5269604/pexels-photo-5269604.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            },
            style8: {
                BodyImageUrl: 'https://images.pexels.com/photos/91216/pexels-photo-91216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            },
            style3: {
                BodyImageUrl: 'https://images.pexels.com/photos/1287142/pexels-photo-1287142.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            },
            style4: {
                BodyImageUrl: 'https://images.pexels.com/photos/1353938/pexels-photo-1353938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            },
        },
        selectedBackgroundImageStyleName: 'none',
        theme: 'light'
    },
    reducers: {
        setLocation: (state, action) => {
            state.location = action.payload;
        },
        changeSelectedBackgroundImageStyleName: (state, action) => {
            state.selectedBackgroundImageStyleName = action.payload;
        },
        setTheme: (state, action) => {
            state.theme = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(setSettingData.fulfilled, (state, action) => {
            // Handle fulfilled state if needed
        });
        builder.addCase(setSettingData.rejected, (state, action) => {
            // Handle rejected state if needed
            console.error("Error saving settings:", action.payload);
        });
        builder.addCase(getSettingData.fulfilled, (state, action) => {
            state.selectedBackgroundImageStyleName = action.payload.background;
            state.theme = action.payload.theme;
        });
        builder.addCase(getSettingData.rejected, (state, action) => {
            state.selectedBackgroundImageStyleName = 'none';
        });
        builder.addCase(saveTheme.fulfilled, (state, action) => {
            console.log('Theme saved successfully:', action.payload);
        });
        builder.addCase(saveTheme.rejected, (state, action) => {
            console.error('Failed to save theme:', action.payload);
        });
    },
});

export const { setLocation, changeSelectedBackgroundImageStyleName, setTheme } = appSetting.actions;

export default appSetting.reducer;
