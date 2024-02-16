import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentUser: null,
    error: null,
    loading: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true,
            state.error = null
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateStart: (state) => {
            state.loading = true,
            state.error = null
        },
        updateSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false,
            state.error = null
        },
        updateFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteUserStart: (state) => {
            state.loading = true;
            state.error = null
        },
        deleteUserSuccess: (state) => {
            state.loading = false;
            state.error = false;
            state.currentUser = null;
        },
        deleteUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        signOutSuccess: (state) => {
            state.loading = false;
            state.error = false;
            state.currentUser = null
        }, 
        signOutFailure: (state, action) => {
            state.error = action.payload,
            state.loading = false
        }

    }
})

export const { signInStart, 
    signInSuccess, 
    signInFailure, 
    updateSuccess, 
    updateFailure, 
    updateStart,
    deleteUserStart,
    deleteUserFailure,
    deleteUserSuccess,
    signOutSuccess,
    signOutFailure} = userSlice.actions;

export default userSlice.reducer;