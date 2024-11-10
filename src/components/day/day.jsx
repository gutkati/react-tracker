import React, {useEffect, useState} from 'react';
import styles from "./Day.module.css";
import {gradientColor, arrMonths, arrDays} from '../../arrays/arrays'
import {useDispatch, useSelector} from "react-redux";
import {selectAllDays, markRemove} from "../../parts/days/daysSlice";

const Day = ({index, date}) => {

    let gradient = gradientColor[index]
    const currentDate = new Date()

    const dispatch = useDispatch()

    const num = date.getDate()
    const month = arrMonths[date.getMonth()]
    const day = arrDays[date.getDay()]

    const days = useSelector(selectAllDays)

    const [markShow, setMarkShow] = useState([])

    function removeMarkTracker(id) {
        let nowDate = new Date().toISOString().split('T')[0]
        let todayTracker = days.find(day => day.date === nowDate)

        if(todayTracker) {
            todayTracker.arrTracker.find(mark => {
                if(mark.id === id) {
                    dispatch(markRemove({id: mark.id, nowDate}))
                }
            })
        }
    }

    // markShow: useEffect срабатывает при каждом изменении days и обновляет markShow для отображения выполненных трекеров.
    // useEffect ожидает, пока Redux обновит days, и только потом обновляет отображение маркеров.

    useEffect(() => {
        let nowDate = new Date().toISOString().split('T')[0]
        let todayTracker = days.find(day => day.date === nowDate) // по дате находим нужный день

        console.log('todayTracker', todayTracker)

        if (todayTracker) {
            const updatedMarks = todayTracker.arrTracker.map(tracker => (
                <div
                    key={tracker.id}
                    style={{backgroundColor: tracker.color}}
                    className={styles.mark__circle}
                    data-tooltip={tracker.name} // Используем `data-tooltip` атрибут
                    onClick={() => removeMarkTracker(tracker.id)}

                />
            ));
            setMarkShow(updatedMarks);
        }

    }, [days])


    // Чтобы сравнить две даты, лучше использовать toDateString(), это позволит сравнить только день, месяц и год
    return (
        <div className={styles.box__day}>
            {currentDate.toDateString() === date.toDateString()
                ?
                <div>
                    {markShow}
                </div>
                :
                ''}


            <div
                className={`${styles.square} ${currentDate.toDateString() === date.toDateString() ? styles.mark__square : ''}`}>
                <p>{day}</p>
            </div>
            <div className={`${styles.circle} ${styles[gradient]}`}>
                <div className={styles.little__circle}>
                    <p>{num}</p>
                </div>
            </div>
            <p>{month}</p>
        </div>
    );
};

export default Day;