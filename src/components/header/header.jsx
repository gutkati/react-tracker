import React from 'react';
import Title from "../title/title";
import InputStyle from "../inpytStyle/inputStyle";
import styles from './Header.module.css'
import Logo from "../logo/logo";
import {NavLink} from "react-router-dom";

const Header = () => {
    return (
        <div className={styles.header}>
            <NavLink to='/' className={styles.logo}>
                <Logo/>
            </NavLink>

            <Title text='Универсальный трекер дел'/>
            <div className={styles.box__buttons}>
                {/*<NavLink to='/trackers' className={styles.btn__settings}></NavLink>*/}
                <NavLink to='/createTracer'>
                    <InputStyle  value='Создать трекер' type='button' size='size__small'/>
                </NavLink>

            </div>

        </div>
    );
};

export default Header;