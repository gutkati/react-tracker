import React, {useState} from 'react';
import Title from "../title/title";
import InputStyle from "../inpytStyle/inputStyle";
import styles from './Header.module.css'
import Logo from "../logo/logo";
import {NavLink} from "react-router-dom";

const Header = () => {

    const [isVisible, setIsVisible] = useState(false)

    function closeModalDesc() {
        setIsVisible(false)
    }

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
                        <div className={styles.close__description} onClick={closeModalDesc}/>
                        <p className={styles.text__description}>Пользователь может создавать новые метки для
                            отслеживания задач, событий или важных дел.<br/><br/>
                            Каждая метка содержит:<br/>
                            - Основной контент (название, запланированное и выполненное количество).<br/>
                            - Кнопку для редактирования метки.<br/>
                            - Чекбокс, который показывает/скрывает метки в календаре.<br/><br/>
                            Метки в календаре можно добавлять (выбирая любой день, пользователь отмечает выполненные
                            дела) и удалять нажимая на метку в календаре.
                            <br/><br/>
                            В настройках пользователь может редактировать название, цвет, запланированное количество и
                            включать/выключать уведомления. Удалять метку трекера.
                        </p>
                    </div>
                    : ''
                }

            </div>

        </div>
    );
};

export default Header;