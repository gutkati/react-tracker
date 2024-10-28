import React from 'react';
import Logo from "../../components/logo/logo";
import Title from "../../components/title/title";
import InputStyle from "../../components/inpytStyle/inputStyle";
import styles from "../../components/header/Header.module.css";
import stylesList from './TrackerList.module.css'
import Footer from "../../components/footer/footer";
import {gradientColorMini} from "../../arrays/arrays";
import ButtonUnderline from "../../components/buttonUnderline/buttonUnderline";

const TrackerList = () => {


    return (
        <div className={stylesList.trackerList}>
            <header className={styles.header}>
                <div className={styles.logo}>
                    <Logo/>
                </div>

                <Title text='Универсальный трекер дел'/>
                <div className={styles.box__buttons}>
                    <InputStyle value='Добавить' type='button' size='size__small'/>
                </div>
            </header>

            <div className={stylesList.subtitle}>
                <h2 className={stylesList.title}>Выбери трекер и настрой!</h2>
            </div>

            <div className={stylesList.container__list}></div>

            <div>
                <ButtonUnderline text='на главную'/>
            </div>

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