import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {nanoid} from "nanoid";
import {contactsState, FetchMessageResponse, User} from "./types";
import {fetchUser, getMessage} from "./asyncActions";


const initialState: contactsState = {
    phoneNumber: '',
    isSent: false,
    users: [],
}

export const contactsSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {
        setPhoneNumber(state, action: PayloadAction<string>) {
            state.phoneNumber = action.payload
        },
        sendMessage(state, action: PayloadAction<{ chatId: string, message: string, myChatId: string }>) {
            const findUser = state.users.find(obj => obj.chatId === action.payload.chatId)
            console.log(findUser, 'USER')
            if (findUser) {
                findUser.chat.unshift({
                    chatId: action.payload.myChatId,
                    idMessage: nanoid(),
                    message: action.payload.message
                })
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
                const findUser = state.users.find(obj => obj.chatId === action.payload.chatId)
                if (!findUser) {
                    const user: User = {
                        chatId: action.payload.chatId,
                        name: action.payload.name,
                        chat: []
                    }
                    state.users.unshift(user)
                }
            })
            .addCase(getMessage.pending, (state) => {
                state.isSent = true
            })
            .addCase(getMessage.fulfilled, (state: contactsState, action: PayloadAction<FetchMessageResponse>) => {
                if (action.payload && action.payload?.body) {
                    const {senderData, messageData, idMessage} = action.payload.body

                    if (senderData) {
                        const findUser = state.users.find(obj => obj.chatId === senderData.chatId)
                        if (findUser) {
                            findUser.chat.unshift({
                                idMessage: idMessage, //nanoid(),
                                message: messageData.extendedTextMessageData.text,
                                chatId: senderData.sender
                            })
                        }
                    }
                }
                state.isSent = false
            })
            .addCase(getMessage.rejected, (state) => {
                state.isSent = false
            })

    }
})
export const {sendMessage} = contactsSlice.actions
export const contactsReducer = contactsSlice.reducer