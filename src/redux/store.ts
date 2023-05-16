import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {authReducer} from "./auth/authSlice";
import {contactsReducer} from "./contacts/contactsSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        contacts: contactsReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => (AppDispatch) = useDispatch