import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from '../firebase/config';
import { setSettingData } from "./appSettingReducer";
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from "firebase/auth";

// Async thunk for signup
export const appAuthSignup = createAsyncThunk('appAuthSignup',
    async ({ name, photoURL, email, password }, thunkAPI) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: name, photoURL: photoURL });
            await sendEmailVerification(userCredential.user);
            await thunkAPI.dispatch(setSettingData());
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

// Async thunk for resending email verification
export const appAuthResendMail = createAsyncThunk('appAuthResendMail',
    async (_, thunkAPI) => {
        try {
            const user = auth.currentUser;
            if (user) {
                await sendEmailVerification(user);
                return { email: user.email };
            } else {
                throw new Error("No authenticated user found.");
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Async thunk for logout
export const appAuthLogout = createAsyncThunk('appAuthLogout',
    async (_, thunkAPI) => {
        try {
            await signOut(auth);
            return {};
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
        resendMailStatus: '', // Added state for resend mail status
        resendMailError: '', // Added state for resend mail error
        user: null, // State to store user data
    },
    reducers: {
        openAuthPage: (state) => {
            state.authPage = true;
        },
        closeAuthPage: (state) => {
            if (state.user !== null)
                state.authPage = false;
        },
        appsetUser: (state, action) => {
            state.user = action.payload;
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
            })
            // Resend email verification reducers
            .addCase(appAuthResendMail.pending, (state) => {
                state.resendMailStatus = 'sending';
                state.resendMailError = null;
            })
            .addCase(appAuthResendMail.fulfilled, (state, action) => {
                state.resendMailStatus = 'succeeded';
                // Optionally set a message indicating success
            })
            .addCase(appAuthResendMail.rejected, (state, action) => {
                state.resendMailStatus = 'failed';
                state.resendMailError = action.payload;
            });
    }
});

export const { openAuthPage, closeAuthPage, validate, appsetUser } = appAuth.actions;

export default appAuth.reducer;
