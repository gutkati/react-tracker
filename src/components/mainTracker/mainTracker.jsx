import React, {useEffect, useState} from 'react';
import styles from './MainTracker.module.css'
import InfoBox from "../infoBox/infoBox";
import InputStyle from "../inpytStyle/inputStyle";
import Day from "../day/day";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectAllTrackers} from "../../parts/trackers/trackersSlice";
import BtnTracker from "../btnTracker/btnTracker";
import {selectAllDays, daysAdded, trackerDaysAdded} from "../../parts/days/daysSlice";
import {useMediaQuery} from "react-responsive"; //

const MainTracker = () => {

    const [arrShowDays, setArrShowDays] = useState([])
    const trackers = useSelector(selectAllTrackers)
    const days = useSelector(selectAllDays)
    const isSmallScreen = useMediaQuery({maxWidth: 650});

    const dispatch = useDispatch()

    useEffect(() => {
        setArrShowDays(getDaysRange())
    }, [isSmallScreen])

    function saveMarkTracker(id, name, color) {
        // преобразуем дату в формат YYYY-MM-DD
        let nowDate = new Date().toISOString().split('T')[0]

        // проверяем сегодняшнюю дату с датой в массиве дней
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

        // Проверяем ширину экрана

        // Количество дней (7 для маленьких экранов, 14 для остальных)
        const days = []
        if (isSmallScreen) {
            for (let i = 0; i < 7; i++) {
                const day = new Date(startOfCurrentWeek)
                day.setDate(startOfCurrentWeek.getDate() + i)

                days.push(day)
            }
        } else {
            for (let i = 0; i < 14; i++) {
                const day = new Date(startOfPreviousWeek)
                day.setDate(startOfPreviousWeek.getDate() + i)

                days.push(day)
            }
        }
        return days
    }

// карусель календаря назад на 3 дня
    function showPrevDays() {
        let firstDayArr = arrShowDays[0] // первый день массива

        for (let i = 1; i < 3; i++) {
            const newDay = new Date(firstDayArr)
            newDay.setDate(firstDayArr.getDate() - i)
            arrShowDays.unshift(newDay)
        }
        let arrPrevDays
        if (isSmallScreen) {
            arrPrevDays = arrShowDays.slice(0, 7)
        } else {
            arrPrevDays = arrShowDays.slice(0, 14)
        }

        setArrShowDays(arrPrevDays)
    }

// карусель календаря вперед на 3 дня
    function showNextDays() {
        let lastDayArr = arrShowDays[arrShowDays.length - 1] // последний день массива

        for (let i = 1; i < 3; i++) {
            const newDay = new Date(lastDayArr)
            newDay.setDate(lastDayArr.getDate() + i)
            arrShowDays.push(newDay)
        }

        let arrPrevDays
        if (isSmallScreen) {
            arrPrevDays = arrShowDays.slice(-7)
        } else {
            arrPrevDays = arrShowDays.slice(-14)
        }

        // let arrPrevDays = arrShowDays.slice(-14)
        setArrShowDays(arrPrevDays)
    }

    return (
        <div className={styles.main}>
            <div className={styles.container__trackers}>
                {trackers.length
                    ?
                    trackers.map((tracker) => (
                        // tracker.checked &&
                        <BtnTracker
                            key={tracker.id}
                            id={tracker.id}
                            name={tracker.name}
                            quantity={tracker.quantity}
                            color={tracker.color}
                            message={tracker.message}
                            to={`/editTracker/${tracker.id}`}
                            onClick={() => saveMarkTracker(tracker.id, tracker.name, tracker.color)}
                            checked={tracker.checked}
                        />))
                    :
                    <InfoBox text='Универсальный трекер дел — это инструмент, предназначенный для эффективного управления и отслеживания задач в различных сферах жизни, таких как работа, учёба, спорт или личные цели. Он помогает структурировать задачи, следить за их выполнением, контролировать сроки и мотивирует на достижение поставленных целей.'/>
                }
            </div>

            <div className={styles.container__main}>
                <div className={styles.border}/>
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

                    <button className={styles.next} onClick={showNextDays}/>
                </div>

                {/*<div className={styles.container__filter}>*/}
                {/*    <p className={styles.filter__text}>Оставить нужные трекеры</p>*/}

                {/*    <NavLink to='/trackers' className={styles.filter}>*/}
                {/*        <InputStyle size='size__small' value='Все трекеры' type='button'/>*/}
                {/*    </NavLink>*/}
                {/*</div>*/}

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