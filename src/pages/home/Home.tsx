import React, {FC, useEffect, useRef, useState} from 'react';
import styles from './home.module.scss'
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {Navigate, useNavigate} from "react-router";
import ContactItem from "../../components/contacts/ContactItem";
import {getUser, User} from "../../redux/contacts/contactsSlice";
import ChatBlock from "../../components/chat/ChatBlock";


const Home: FC = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const isSent = useAppSelector(state => state.contacts.isSent)
    const users = useAppSelector(state => state.contacts.users)
    const [searchValue, setSearchValue] = useState('')
    const [currentUser, setCurrentUser] = useState<User | null>(null)


    useEffect(() => {
        if (isSent) {
            setSearchValue('')

        }
    }, [isSent])


    const onClickAddUser = () => {
        dispatch(getUser(searchValue))
    }
    const onClickSetCurrentChat = (id: string, name: string) => {
        setCurrentUser({chatId: id, name} as User)
    }


    if (!isAuth) {
        //navigate('/')
        return <Navigate to={'/'}/>
    }

    return (
        <div className={styles.home}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    WhatsChat
                </div>
                <div className={styles.main}>
                    <div className={styles.contacts}>
                        contacts
                        <div>
                            <input onChange={(event) => setSearchValue(event.currentTarget.value)}
                                   type="number"
                                   value={searchValue}
                                   placeholder={'search'}
                                   style={{margin: '0 15px'}}/> {/*FIIIIIIIIIIIIIX*/}

                            <button onClick={onClickAddUser}>add</button>

                        </div>
                        {users.map(obj => <ContactItem key={obj.chatId}
                                                       onClickSetChat={(id, name) => onClickSetCurrentChat(id, name)}
                                                       id={obj.chatId}
                                                       name={obj.name}/>)}

                    </div>
                    <div className={styles.chat}>
                        {currentUser && <ChatBlock chatId={currentUser.chatId} name={currentUser.name}/>}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Home;
