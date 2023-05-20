export type MeAuthArg = {
    instanceId: string
    apiToken: string
}
export type AuthResponseType = {
    wid: string
}

export interface authState {
    isAuth: boolean
    waInstance: string | null
    chatId: string | null
    apiToken: string | null
    isLoading: boolean
    errorSignIn: string
}