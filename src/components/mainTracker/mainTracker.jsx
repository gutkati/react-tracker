import React, {useEffect, useState} from 'react';
import styles from './MainTracker.module.css'
import InfoBox from "../infoBox/infoBox";
import InputStyle from "../inpytStyle/inputStyle";
import Day from "../day/day";
import {NavLink, Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectAllTrackers} from "../../parts/trackers/trackersSlice";
import ButtonUnderline from "../buttonUnderline/buttonUnderline";
import BtnTracker from "../btnTracker/btnTracker";
import {selectAllDays, selectDayDate, daysAdded, trackerDaysAdded} from "../../parts/days/daysSlice";

const MainTracker = () => {

    const [arrShowDays, setArrShowDays] = useState(getDaysRange())
    const trackers = useSelector(selectAllTrackers)
    const days = useSelector(selectAllDays)

    // const [markShow, setMarkShow] = useState([])


    // const trackers = useSelector(state => state.trackers.trackers)

    const dispatch = useDispatch()

    function saveMarkTracker(id, name, color) {
        // преобразуем дату в формат YYYY-MM-DD
        let nowDate = new Date().toISOString().split('T')[0]
        console.log('data', id, nowDate, name, color)

        // проверяем сегодняшнююдату с датой в массиве дней
        let existingTracker = days.find(day => day.date === nowDate)

        // Проверяем, существует ли трекер с данным `id` внутри найденного дня
        const checkTracker = existingTracker
            ? existingTracker.arrTracker.some(tracker => tracker.id === id)
            : false;

        // Если даты нет в массиве дней, добавляем новый день с трекером
        if (!existingTracker) {
            dispatch(daysAdded(id, nowDate, name, color))
        }
        // Если день существует, но трекер в нем еще не добавлен, добавляем трекер
        else if (existingTracker && !checkTracker) {
            dispatch(trackerDaysAdded(id, nowDate, name, color))
        }
    }

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

    // карусель календаря назад на 3 дня
    function showPrevDays() {
        let firstDayArr = arrShowDays[0] // первый день массива

        for (let i = 1; i < 4; i++) {
            const newDay = new Date(firstDayArr)
            newDay.setDate(firstDayArr.getDate() - i)
            arrShowDays.unshift(newDay)
        }

        let arrPrevDays = arrShowDays.slice(0, 14)
        setArrShowDays(arrPrevDays)
    }

    // карусель календаря вперед на 3 дня
    function showNextDays() {
        let lastDayArr = arrShowDays[arrShowDays.length - 1] // последний день массива

        for (let i = 1; i < 4; i++) {
            const newDay = new Date(lastDayArr)
            newDay.setDate(lastDayArr.getDate() + i)
            arrShowDays.push(newDay)
        }

        let arrPrevDays = arrShowDays.slice(-14)
        setArrShowDays(arrPrevDays)
    }

    return (
        <div className={styles.main}>
            <div className={styles.container__trackers}>
                {trackers.length
                    ?
                    trackers.map((tracker) => (
                        tracker.checked &&
                        <BtnTracker
                            key={tracker.id}
                            name={tracker.name}
                            quantity={tracker.quantity}
                            color={tracker.color}
                            message={tracker.message}
                            to={`/editTracker/${tracker.id}`}
                            onClick={() => saveMarkTracker(tracker.id, tracker.name, tracker.color)}
                        />))
                    :
                    <InfoBox/>
                }
            </div>

            <div className={styles.container__main}>
                <div className={styles.container__marks}>
                    <button className={styles.prev} onClick={showPrevDays}/>
                    <div className={styles.container__calendar}>
                        {arrShowDays.map((date, index) => (
                            <Day
                                key={index}
                                index={index}
                                date={date}
                            />
                        ))}

                    </div>
                    {/*<div className={styles.marks}></div>*/}

                    <button className={styles.next} onClick={showNextDays}/>
                </div>

                {/*<div className={styles.border}></div>*/}


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