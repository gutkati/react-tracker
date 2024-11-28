import React, {useEffect, useState} from 'react';
import styles from "./Day.module.css";
import {gradientColor, arrMonths, arrDays} from '../../arrays/arrays'
import {useDispatch, useSelector} from "react-redux";
import {selectAllDays, markRemove} from "../../parts/days/daysSlice";
import {selectAllTrackers} from "../../parts/trackers/trackersSlice";

const Day = ({index, date, selectDay, onClick}) => {

        const trackers = useSelector(selectAllTrackers)
        let gradient = gradientColor[index]

        const dispatch = useDispatch()
        const num = date.getDate()
        const month = arrMonths[date.getMonth()]
        const day = arrDays[date.getDay()]
        let dayOff = date.getDay()
        const days = useSelector(selectAllDays)
        const isSelected = selectDay.toDateString() === date.toDateString();

        console.log('isSelected', isSelected)

        const tooltipClose = date.toISOString().split('T')[0] === selectDay.toISOString().split('T')[0]

        // массив с отмеченными трекерами
        const arrFilterCheck = trackers.filter(tracker => tracker.checked)

        const daysFilter = days.map(day => ({
            ...day, // Сохраняем остальные свойства дня
            arrTracker: day.arrTracker.filter(el =>
                arrFilterCheck.some(tracker => tracker.id === el.id) // получаем совпадения
            )
        }))

        const marks = (date) => {
            // Фильтруем трекеры по состоянию checked
            const dayData = daysFilter.find(day => day.date === date.toISOString().split('T')[0])

            // Если день найден, создаем элементы; если нет, возвращаем пустой массив
            if (dayData) {
                return dayData.arrTracker.map(dayTracker => (

                    <div key={dayTracker.id} className={styles.box__circle}>
                        <div
                            style={{backgroundColor: dayTracker.color}}
                            className={styles.mark__circle}
                            data-tooltip={dayTracker.name}
                            onClick={() => removeMarkTracker(dayTracker.id)} // Для удаления трекера
                        >

                        </div>

                        {tooltipClose && (
                                <div className={styles.mark__circle_close}/>
                            )}

                    </div>

                ))

            } else {
                return []
            }
        }

        function removeMarkTracker(id) {
            let nowDate = date.toISOString().split('T')[0] // перевести в формат YYYY-MM-DD

            // если день текущий, применяем удаление отметок
            if (isSelected) {
                let todayTracker = days.find(day => day.date === nowDate)

                if (todayTracker) {
                    todayTracker.arrTracker.find(mark => {
                        if (mark.id === id) {
                            dispatch(markRemove({id: mark.id, nowDate}))
                        }
                    })
                }
            }
        }

// Чтобы сравнить две даты, лучше использовать toDateString(), это позволит сравнить только день, месяц и год
        return (
            <div className={styles.box__day}>

                <p className={styles.month}>{month}</p>

                <div className={`${styles.circle} ${styles[gradient]}`} onClick={() => onClick(date)}>
                    <div className={styles.little__circle}>
                        <p>{num}</p>
                    </div>
                </div>

                <div
                    className={`${styles.square} 
                ${isSelected ? styles.mark__square : ''} // маркировать выбранный день
                ${dayOff === 6 || dayOff === 0 ? styles.off__square : ''}
                `}>
                    <p>{day}</p>
                </div>

                <div>
                    {marks(date)}
                </div>

            </div>
        );
    }
;

export default Day;


// markShow: useEffect срабатывает при каждом изменении days и обновляет markShow для отображения выполненных трекеров.
// useEffect ожидает, пока Redux обновит days, и только потом обновляет отображение маркеров.

// useEffect(() => {
//     let nowDate = new Date().toISOString().split('T')[0]
//     let todayTracker = days.find(day => day.date === nowDate) // по дате находим нужный день
//     let prevDays = days.find(day => day.date === date.toISOString().split('T')[0])
//     console.log('date', date.toISOString().split('T')[0])
//
//     if (prevDays) {
//         const updatedMarks = prevDays.arrTracker.map(tracker => (
//             <div
//                 key={tracker.id}
//                 style={{backgroundColor: tracker.color}}
//                 className={styles.mark__circle}
//                 data-tooltip={tracker.name} // Используем `data-tooltip` атрибут
//                 onClick={() => removeMarkTracker(tracker.id)}
//             />
//         ))
//         setMarkShow(updatedMarks);
//     }
//
//
// }, [days])
// {currentDate.toDateString() === date.toDateString()}


// const marks = (date) => {
//
//                 const dayData = days.find(day => day.date === date.toISOString().split('T')[0]);
//
//             // Если для дня найдены трекеры, создаем для них элементы; иначе возвращаем пустой массив
//             return dayData
//                 ? dayData.arrTracker.map(tracker => (
//
//                     <div
//                         key={tracker.id}
//                         className={styles.box__circle}
//
//                     >
//                         <div
//                             key={tracker.id}
//                             style={{backgroundColor: tracker.color}}
//                             className={styles.mark__circle}
//                             data-tooltip={tracker.name}
//                             onClick={() => removeMarkTracker(tracker.id)}  // Для удаления трекера
//                         >
//
//                         </div>
//                         {
//                             tooltipClose && (
//                                 <div className={styles.mark__circle_close}/>
//                             )
//                         }
//
//                     </div>
//
//
//                 ))
//                 : [];  // Пустой массив, если нет трекеров для дня
//
//     };

