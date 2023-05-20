import {createSlice, PayloadAction, SerializedError} from "@reduxjs/toolkit";
import {meAuth} from "./asyncActions";
import {AuthResponseType, authState, MeAuthArg} from "./types";


const initialState: authState = {
    isAuth: false,
    waInstance: null,
    chatId: null,
    apiToken: null,
    isLoading: false,
    errorSignIn: '',
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setMyData(state, action: PayloadAction<{ waInstance: string, apiToken: string }>) {
            state.waInstance = action.payload.waInstance
            state.apiToken = action.payload.apiToken
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(meAuth.pending, (state) => {
                state.isLoading = true
            })
            .addCase(meAuth.fulfilled, (state, action: PayloadAction<AuthResponseType>) => {
                state.isAuth = true
                state.isLoading = false
                state.chatId = action.payload.wid
                console.log('auth', action.payload)
            })
            .addCase(meAuth.rejected, (state, action: PayloadAction<unknown, string, {
                arg: MeAuthArg;
                requestId: string;
                requestStatus: "rejected";
                aborted: boolean;
                condition: boolean;
            } & ({ rejectedWithValue: true; } | ({ rejectedWithValue: false; } & {})), SerializedError>) => {
                state.isLoading = true
                if (action.error.message) {
                    state.errorSignIn = action.error.message
                }
            })
    }
})

export const {setMyData} = authSlice.actions
export const authReducer = authSlice.reducer