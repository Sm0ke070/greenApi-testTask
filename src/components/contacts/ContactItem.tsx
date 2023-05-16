import React, {FC} from 'react';
import styles from './contactItem.module.scss'

type ContactItemPropsType = {
    id: string
    name: string
    onClickSetChat: (id: string, name: string) => void
}
const ContactItem: FC<ContactItemPropsType> = ({name, id, onClickSetChat}) => {


    const today = new Date()
    const now = today.toLocaleDateString('en-US')

    return (
        <div className={styles.container} onClick={() => onClickSetChat(id, name)}>
            <div className={styles.item}>
                <div className={styles.name} style={{border: '1px solid'}}>
                    <div>{name ? name : 'no name'}-{id}</div>
                    <div>{now}</div>
                </div>
                <span className={styles.message}>
                    message message message message message message message message message message message
                </span>
            </div>
        </div>
    );
};

export default ContactItem;
