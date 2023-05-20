import React, {FC, useState} from 'react'
import styles from './home.module.scss'
import {useAppDispatch, useAppSelector} from "../../redux/store"
import {Navigate} from "react-router"
import ContactItem from "../../components/contacts/ContactItem"
import ChatBlock from "../../components/chat/ChatBlock"
import {User} from "../../redux/contacts/types";
import {fetchUser} from "../../redux/contacts/asyncActions";


const Home: FC = () => {

    const dispatch = useAppDispatch()
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const users = useAppSelector(state => state.contacts.users)
    const [searchValue, setSearchValue] = useState('')
    const [currentUser, setCurrentUser] = useState<User | null>(null)

    const isValid = searchValue.length === 11
    const onClickAddUser = () => {
        if (isValid) {
            dispatch(fetchUser(searchValue))
        }
    }
    const onClickSetCurrentChat = (chatId: string, name: string) => {
        setCurrentUser({chatId, name} as User)
    }

    if (!isAuth) {
        return <Navigate to={'/'}/>
    }

    return (
        <div className={styles.home}>
            <div className={styles.container}>
                <div className={styles.main}>
                    <div className={styles.contacts}>
                        contacts
                        <div className={styles.search}>
                            <form>
                                <input onChange={(event) => setSearchValue(event.currentTarget.value)}
                                       value={searchValue}
                                       placeholder={'search'}
                                />
                                <button onClick={onClickAddUser} disabled={!isValid}>add</button>
                            </form>
                        </div>
                        <div>
                            {users.map(obj => <ContactItem key={obj.chatId}
                                                           onClickSetChat={(chatId, name) => onClickSetCurrentChat(chatId, name)}
                                                           chatId={obj.chatId}
                                                           name={obj.name}
                                                           currentUserId={currentUser?.chatId}
                            />)}
                        </div>
                    </div>
                    <div className={styles.chat}>
                        {currentUser ?
                            <ChatBlock chatId={currentUser.chatId} name={currentUser.name}/>
                            :
                            <p style={{fontSize: '20px'}}>Select user</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
