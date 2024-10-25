import React from 'react';
import Title from "../title/title";
import InputStyle from "../inpytStyle/inputStyle";
import styles from './Header.module.css'
import Logo from "../logo/logo";

const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <Logo/>
            </div>

            <Title text='Универсальный трекер дел'/>
            <div className={styles.box__buttons}>
                <div className={styles.btn__settings}></div>
                <InputStyle  value='Добавить' type='button' size='size__small'/>
            </div>

        </div>
    );
};

export default Header;