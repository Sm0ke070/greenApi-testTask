export type SendMessArgsType = {
    phoneNumber: string
    message: string
    chatId: string
}

export interface contactsState {
    phoneNumber: string
    isSent: boolean
    users: User[]
}

export type User = {
    chatId: string
    name: string
    chat: Array<{ chatId: string, idMessage: string, message: string }>
}
export type FetchMessageResponse = {
    receiptId: number
    body: {
        typeWebhook: string
        instanceData: {
            idInstance: number
            wid: string
            typeInstance: string
        },
        timestamp: number
        idMessage: string
        senderData: {
            chatId: string
            chatName: string
            sender: string
            senderName: string
        },
        messageData: {
            typeMessage: string
            extendedTextMessageData: {
                text: string
                description: string
                title: string
                previewType: string
                jpegThumbnail: string
                forwardingScore: number
                isForwarded: false
            }
        }
    }
}

