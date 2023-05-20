import React, {FC, memo, useEffect, useRef, useState} from 'react'
import styles from './chatBlock.module.scss'
import {useAppDispatch, useAppSelector} from "../../redux/store"
import sendIcon from '../../assets/icon/sendIcon.png'
import {getMessage, sendMessageToUser} from "../../redux/contacts/asyncActions";


type ChatBlockPropsType = {
    chatId: string
    name: string
}

const ChatBlock: FC<ChatBlockPropsType> = memo(({chatId, name}) => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.contacts.users.find(obj => obj.chatId === chatId))
    const isSent = useAppSelector(state => state.contacts.isSent)
    const inputRef = useRef<HTMLInputElement>(null)
    const chatRef = useRef<HTMLDivElement>(null)
    const [chatMessage, setChatMessage] = useState('')
    const userPhone = chatId.slice(0, -5)

    useEffect(() => {
        if (!isSent) {
            dispatch(getMessage())
            console.log('interval')
        }
        console.log('useEffect')
    }, [dispatch, isSent])


    useEffect(() => {
        inputRef.current?.focus()
    }, [name])

    const onSubmitSendMessage = (e: React.FormEvent) => {
        inputRef.current?.focus()
        e.preventDefault()
        if (chatMessage) {
            setChatMessage('')
            dispatch(sendMessageToUser({phoneNumber: chatId, message: chatMessage, chatId}))
            //dispatch(sendMessage({chatId: chatId, message: chatMessage, myChatId: myChatId!}))
        }
    }

    return (
        <div className={styles.chatBlock}>
            <div className={styles.chatHeader}>
                {name ? name : 'no name'} - {userPhone}
            </div>
            <div className={styles.chatMain} ref={chatRef}>
                <div className={styles.chatMessages}>
                    {user?.chat.map(obj => (
                        <p key={obj.idMessage}>{obj.chatId === chatId ? name : 'Я'}: {obj.message}</p>
                    ))}
                </div>
            </div>
            <form onSubmit={onSubmitSendMessage} className={styles.form}>
                <input value={chatMessage}
                       onChange={(event) => setChatMessage(event.currentTarget.value)}
                       ref={inputRef}
                       type="text"/>
                <img src={sendIcon} onClick={onSubmitSendMessage} className={styles.sendIcon} alt={'sendIcon'}/>
            </form>

        </div>
    )
})

export default ChatBlock;
