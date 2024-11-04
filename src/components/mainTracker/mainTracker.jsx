import React, {useState} from 'react';
import styles from './MainTracker.module.css'
import InfoBox from "../infoBox/infoBox";
import InputStyle from "../inpytStyle/inputStyle";
import Day from "../day/day";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectAllTrackers} from "../../parts/trackers/trackersSlice";
import ButtonUnderline from "../buttonUnderline/buttonUnderline";
import BtnTracker from "../btnTracker/btnTracker";

const MainTracker = () => {

    let arrShowDays = getDaysRange()
    const trackers = useSelector(selectAllTrackers)
    //const trackers = useSelector(state => state.trackers.trackers)

    // Функция для получения списка дней
    function getDaysRange() {
        const today = new Date();
        const dayOfWeek = today.getDay();
        const startOfCurrentWeek = new Date(today);

        // Определяем начало текущей недели (понедельник)
        startOfCurrentWeek.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1))

        // Определяем начало предыдущей недели (понедельник)
        const startOfPreviousWeek = new Date(startOfCurrentWeek)
        startOfPreviousWeek.setDate(startOfCurrentWeek.getDate() - 7)

        const days = []
        for (let i = 0; i < 14; i++) {
            const day = new Date(startOfPreviousWeek)
            day.setDate(startOfPreviousWeek.getDate() + i)
            days.push(day)
        }

        return days
    }

    return (
        <div className={styles.main}>
            <div className={styles.container__trackers}>
                {trackers.length
                ?
                trackers.map((tracker) => (
                    <BtnTracker
                        name={tracker.name}
                        quantity={tracker.quantity}
                        color={tracker.color}
                        message={tracker.message}
                    />))
                :
                <InfoBox/>
            }
            </div>

            <div className={styles.container__main}>
                <div className={styles.container__marks}>
                    <button className={styles.prev}/>

                    <div className={styles.marks}></div>

                    <button className={styles.next}/>
                </div>

                <div className={styles.border}></div>

                <div className={styles.container__calendar}>
                    {arrShowDays.map((date, index) => (
                        <Day
                            key={index}
                            index={index}
                            date={date}
                        />
                    ))}

                </div>

                <div className={styles.container__filter}>
                    <p className={styles.filter__text}>Оставить нужные трекеры</p>

                    <NavLink to='/trackers' className={styles.filter}>

                        <InputStyle size='size__small' value='Все трекеры' type='button'/>

                        {/*<select className={styles.filter__list}>*/}
                        {/*    {listTrack.map((track, index) => (*/}
                        {/*        <option key={index} value="">{track}</option>*/}
                        {/*    ))}*/}
                        {/*</select>*/}
                    </NavLink>
                </div>

            </div>
        </div>
    )
}


export default MainTracker;


// function getDaysRange() {
//            const today = new Date()
//            console.log('today', today)
//            const dayOfWeek = today.getDay()
//            console.log('dayOfWeek', dayOfWeek)
//            const lastMonday = new Date(today)
//            console.log('lastMonday', lastMonday)
//
//            // Находим понедельник прошлой недели
//            lastMonday.setDate(today.getDate() - dayOfWeek - 6)
//
//
//            const days = []
//            for (let i = 0; i < 14; i++) {
//                const day = new Date(lastMonday)
//                day.setDate(lastMonday.getDate() + i)
//                days.push(day)
//            }
//
//            // console.log('days', days)
//            return days
//        }