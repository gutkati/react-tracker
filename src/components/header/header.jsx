import React from 'react';
import Title from "../title/title";
import InputStyle from "../inpytStyle/inputStyle";
import styles from './Header.module.css'
import Logo from "../logo/logo";

const Header = () => {
    return (
        <div className={styles.header}>
            <Logo/>
            <Title text='Универсальный трекер дел'/>
            <div className={styles.box__buttons}>
                <div className={styles.btn__settings}></div>
                <InputStyle  value='Добавить' type='button'/>
            </div>

        </div>
    );
};

export default Header;