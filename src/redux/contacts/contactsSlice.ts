import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios, {AxiosResponse} from "axios";
import {RootState} from "../store";

export const getUser = createAsyncThunk('contacts/getUser', async (phoneNumber: string, thunkAPI) => {
        const {auth} = thunkAPI.getState() as RootState
        const {id, apiToken} = auth
        const params = {chatId: `${phoneNumber}@c.us`}
        const url = `https://api.green-api.com/waInstance${id}/GetContactInfo/${apiToken}`
        const res = await axios.post<User, AxiosResponse>(url, params)
        console.log(res.data)
        return res.data
    }
)

export interface contactsState {
    phoneNumber: string
    isSent: boolean
    users: User[]
}

const initialState: contactsState = {
    phoneNumber: '',
    isSent: false,
    users: [],
}
export type User = {
    chatId: ''
    name: ''
}
export const contactsSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {
        setPhoneNumber(state, action: PayloadAction<string>) {
            state.phoneNumber = action.payload
            console.log(state.phoneNumber)
        },
        setUser(state, action: PayloadAction<User>) {

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.isSent = false
            })
            .addCase(getUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.isSent = true
                const user: User = {chatId: action.payload.chatId, name: action.payload.name}
                const findUser = state.users.find(obj => obj.chatId === action.payload.chatId)
                if (!findUser) {
                    state.users.push(user)
                }
                console.log('FULFILLED')
            })
            .addCase(getUser.rejected, (state) => {
                console.log('getUser--rejected')
            })

    }
})
export const {setUser} = contactsSlice.actions
export const contactsReducer = contactsSlice.reducer
