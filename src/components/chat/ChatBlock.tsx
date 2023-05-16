import React, {FC, useEffect, useRef} from 'react';
import styles from './chatBlock.module.scss'

type ChatBlockPropsType = {
    chatId: string
    name: string
}

const ChatBlock: FC<ChatBlockPropsType> = ({chatId, name}) => {

    const inputRef = useRef<HTMLInputElement>(null)
    console.log('ChatBlock')

    useEffect(() => {
        inputRef.current && inputRef.current.focus()
    }, [name])

    const userPhone = chatId.slice(0, -5)
    return (
        <div className={styles.chatBlock}>
            <div className={styles.chatHeader}>
                {name ? name : 'no name'} - {userPhone}
            </div>
            <div className={styles.chatMain}>
                <div>chat</div>
                <input ref={inputRef} type="text"/>
            </div>
        </div>
    );
};

export default ChatBlock;
