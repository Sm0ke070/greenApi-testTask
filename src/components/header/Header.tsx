import React, {FC} from 'react';
import {useNavigate} from "react-router";
import styles from './header.module.scss'

const Header: FC = () => {
    const navigate = useNavigate()


    return (
        <div className={styles.header}>
            <span>HEADER</span>
            <button style={{fontSize: '20px'}} onClick={() => navigate('/')}>login</button>
            <button style={{fontSize: '20px'}} onClick={() => navigate('home')}>home</button>
        </div>
    );
};

export default Header;
