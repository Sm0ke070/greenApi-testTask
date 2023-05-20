import {createAsyncThunk} from "@reduxjs/toolkit";
import axios, {AxiosResponse} from "axios";
import {AuthResponseType, MeAuthArg} from "./types";

export const meAuth = createAsyncThunk('auth/meAuth', async (arg: MeAuthArg) => {
        const {instanceId, apiToken} = arg
        const res = await axios.get<AuthResponseType, AxiosResponse>(`https://api.green-api.com/waInstance${instanceId}/getSettings/${apiToken}`)
        return res.data
    }
)