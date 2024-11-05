import React, {useState} from 'react';
import Logo from "../../../components/logo/logo";
import Title from "../../../components/title/title";
import InputStyle from "../../../components/inpytStyle/inputStyle";
import styles from "../../../components/header/Header.module.css";
import stylesList from './TrackerList.module.css'
import Footer from "../../../components/footer/footer";
import {gradientColorMini} from "../../../arrays/arrays";
import ButtonUnderline from "../../../components/buttonUnderline/buttonUnderline";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectAllTrackers} from "../trackersSlice";
import BtnTracker from "../../../components/btnTracker/btnTracker";
import Checkbox from "../../../components/checkbox/checkbox";

const TrackerList = () => {

    const trackers = useSelector(selectAllTrackers)

    const [checked, setChecked] = useState(true)

    const onCheckedChange = () => setChecked(!checked)

    return (
        <div className={stylesList.trackerList}>
            <header className={styles.header}>
                <NavLink to='/' className={styles.logo}>
                    <Logo/>
                </NavLink>

                <Title text='Универсальный трекер дел'/>
                <NavLink to='/editTracker' className={styles.box__buttons}>
                    <InputStyle value='Добавить' type='button' size='size__small'/>
                </NavLink>
            </header>

            <div className={stylesList.subtitle}>
                <h2 className={stylesList.title}>Выбери трекер и настрой!</h2>
            </div>

            <div className={stylesList.container__list}>
                {trackers.map((tracker) => (
                    <div className={stylesList.container__trackers}>
                        <BtnTracker
                            name={tracker.name}
                            quantity={tracker.quantity}
                            color={tracker.color}
                            message={tracker.message}
                        />
                        <Checkbox
                            info='showInfo'
                            checked={checked}
                            onChecked={onCheckedChange}
                        />
                    </div>
                ))}
            </div>

            <NavLink to='/'>
                <ButtonUnderline text='на главную'/>
            </NavLink>

            <div className={stylesList.decor}>
                <div className={stylesList.list__circle}>
                    {gradientColorMini.map((gradient, index) => (
                        <div key={index} className={`${stylesList.decor__circle} ${stylesList[gradient]}`}/>
                    ))}
                </div>

                <div className={stylesList.border}/>

            </div>

            <Footer/>
        </div>
    );
};

export default TrackerList;