import React, {useState} from 'react';
import Title from "../title/title";
import InputStyle from "../inpytStyle/inputStyle";
import styles from './Header.module.css'
import Logo from "../logo/logo";
import {NavLink} from "react-router-dom";
import InfoBox from "../infoBox/infoBox";

const Header = () => {

    const [isVisible, setIsVisible] = useState(false)
    return (
        <div className={styles.header}>
            <NavLink to='/' className={styles.logo}>
                <Logo/>
            </NavLink>

            <Title text='Универсальный трекер дел'/>
            <div className={styles.box__buttons}>

                <NavLink to='/create'>
                    <InputStyle value='Создать трекер' type='button' size='size__small'/>
                </NavLink>

                <p className={styles.link__desc} onClick={() => setIsVisible(true)}>как использовать</p>

                {isVisible ?
                    <div className={styles.box__description}>
                        {/*<p>скоро здесь будет текст</p>*/}
                    </div>
                    : ''
                }

            </div>

        </div>
    );
};

export default Header;