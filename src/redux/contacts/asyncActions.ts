import {createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "../store";
import axios, {AxiosResponse} from "axios";
import {FetchMessageResponse, SendMessArgsType, User} from "./types";

export const fetchUser = createAsyncThunk('contacts/getUser', async (phoneNumber: string, thunkAPI) => {
        const {auth} = thunkAPI.getState() as RootState
        const {waInstance, apiToken} = auth
        const params = {chatId: `${phoneNumber}@c.us`}
        const url = `https://api.green-api.com/waInstance${waInstance}/GetContactInfo/${apiToken}`
        const res = await axios.post<User, AxiosResponse>(url, params)
        console.log(res.data)
        return res.data
    }
)

export const sendMessageToUser = createAsyncThunk('contacts/sendMessageToUser', async (args: SendMessArgsType, thunkAPI) => {
        const {auth} = thunkAPI.getState() as RootState
        const {waInstance, apiToken} = auth
        const {message, phoneNumber} = args
        const params = {chatId: phoneNumber, message: message}
        const url = `https://api.green-api.com/waInstance${waInstance}/SendMessage/${apiToken}`
        const res = await axios.post<User, AxiosResponse>(url, params)
        return res.data
    }
)
export const getMessage = createAsyncThunk('contacts/getMessage', async (_, thunkAPI) => {
        const {auth} = thunkAPI.getState() as RootState
        console.log("вызов getMessage")
        const {waInstance, apiToken} = auth
        let receiptId = 0
        const url = `https://api.green-api.com/waInstance${waInstance}/ReceiveNotification/${apiToken}`
        const res = await axios.get<FetchMessageResponse, AxiosResponse>(url)
        receiptId = res?.data.receiptId
        await axios.delete(`https://api.green-api.com/waInstance${waInstance}/deleteNotification/${apiToken}/${receiptId}`)
        return res.data
    }
)