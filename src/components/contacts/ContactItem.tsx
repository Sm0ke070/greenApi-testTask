import React, {FC} from 'react';
import styles from './contactItem.module.scss'
import {useAppSelector} from "../../redux/store";

type ContactItemPropsType = {
    chatId: string
    name: string
    currentUserId?: string
    onClickSetChat: (chatId: string, name: string) => void
}
const ContactItem: FC<ContactItemPropsType> = ({name, chatId, onClickSetChat, currentUserId}) => {

    const user = useAppSelector(state => state.contacts.users.find(obj => obj.chatId === chatId))
    const isActive = chatId === currentUserId;

    return (
        <div className={`${styles.container} ${isActive ? styles.active : ''}`}

             onClick={() => onClickSetChat(chatId, name)}>
            <div className={styles.item}>
                <div>
                    <div>{name ? name : 'no name'} - <span style={{color:'#a5a5a5', fontSize:'12px'}}>{chatId.slice(0, -5)}</span></div>
                </div>
                <span className={styles.message}>
                    {user?.chat[0]?.message}
                </span>
            </div>
        </div>
    );
};

export default ContactItem;
