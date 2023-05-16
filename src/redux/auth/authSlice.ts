import {createAsyncThunk, createSlice, PayloadAction, SerializedError} from "@reduxjs/toolkit";
import axios, {AxiosResponse} from "axios";

type MeAuthArg = {
    instanceId: string
    apiToken: string
}
type AuthResponseType = {
    wid: string
}
//`https://api.green-api.com/waInstance1101821022/SendMessage/d533bf6949c642219f18217a873c3368ae2d1321f707470a97`, {"chatId": "79911137067@c.us","message": "test_message"}
export const meAuth = createAsyncThunk('auth/meAuth', async (arg: MeAuthArg) => {
        const {instanceId, apiToken} = arg
        const res = await axios.get<AuthResponseType, AxiosResponse>(`https://api.green-api.com/waInstance${instanceId}/getSettings/${apiToken}`)
        return res.data
    }//fix any
)

export interface authState {
    isAuth: boolean
    id: string
    apiToken: string
    isLoading: boolean
    errorSignIn: string
}

const initialState: authState = {
    isAuth: false,
    id: '',
    apiToken: '',
    isLoading: false,
    errorSignIn: '',
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setMyData(state, action: PayloadAction<{ id: string, apiToken: string }>) {
            state.id = action.payload.id
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