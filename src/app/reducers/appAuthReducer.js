import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from '../firebase/config';
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signInWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";

// Async thunk for signup
export const appAuthSignup = createAsyncThunk('appAuthSignup',
    async ({ name, email, password }, thunkAPI) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: name });
            await sendEmailVerification(userCredential.user);
            return { email: userCredential.user.email };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Async thunk for login
export const appAuthLogin = createAsyncThunk('appAuthLogin',
    async ({ email, password }, thunkAPI) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return { email: userCredential.user.email };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Redux slice for appAuth
export const appAuth = createSlice({
    name: 'appAuth',
    initialState: {
        authPage: false,
        validationError: '',
        signupStatus: '',
        signupError: '',
        loginStatus: '',
        loginError: '',
        user: null, // Add user state to store user data
    },
    reducers: {
        openAuthPage: (state) => {
            state.authPage = true;
        },
        closeAuthPage: (state) => {
            state.authPage = false;
        },
        validate: (state, action) => {
            const { name, email, password } = action.payload;
            const nameRegex = /^[a-zA-Z\s]+$/;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!nameRegex.test(name)) {
                state.validationError = "*Name must not contain symbols or numbers.";
            } else if (!emailRegex.test(email)) {
                state.validationError = "*Invalid email address.";
            } else if (password.length < 8) {
                state.validationError = "*Password must be at least 8 characters long.";
            } else {
                state.validationError = null;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            // Signup reducers
            .addCase(appAuthSignup.pending, (state) => {
                state.signupStatus = 'loading';
                state.signupError = null;
            })
            .addCase(appAuthSignup.fulfilled, (state, action) => {
                state.signupStatus = 'succeeded';
                state.user = action.payload;
                state.authPage = false; // Close auth page after signup
            })
            .addCase(appAuthSignup.rejected, (state, action) => {
                state.signupStatus = 'failed';
                state.signupError = action.payload;
            })
            // Login reducers
            .addCase(appAuthLogin.pending, (state) => {
                state.loginStatus = 'loading';
                state.loginError = null;
            })
            .addCase(appAuthLogin.fulfilled, (state, action) => {
                state.loginStatus = 'succeeded';
                state.user = action.payload;
                state.authPage = false; // Close auth page after login
            })
            .addCase(appAuthLogin.rejected, (state, action) => {
                state.loginStatus = 'failed';
                state.loginError = action.payload;
            });
    }
});

export const { openAuthPage, closeAuthPage, validate } = appAuth.actions;

export default appAuth.reducer;
