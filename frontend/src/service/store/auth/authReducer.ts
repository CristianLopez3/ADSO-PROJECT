import { AuthPayload, AuthState } from "@/utils/types/Auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginAction } from "./authActions";

const initialState: AuthState = {
    isLoading: false,
    user: null,
    isError: false,
};

const authSlice = createSlice({
name: 'auth',
initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(loginAction.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(loginAction.fulfilled, (state, action: PayloadAction<AuthPayload>) => {
            state.isLoading = false;
            state.user = {
                accessToken: action.payload.accessToken,
                user: action.payload.user,
                expiresIn: action.payload.expiresIn,
            };
        })
        .addCase(loginAction.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        })
    }  
})

export default authSlice.reducer;