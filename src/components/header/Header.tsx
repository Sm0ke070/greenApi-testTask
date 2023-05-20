import React, {FC} from 'react';
import styles from './header.module.scss'

const Header: FC = () => {
    return (
        <header className={styles.header}>
            <span>WhatsChat</span>
        </header>
    );
};

export default Header;
