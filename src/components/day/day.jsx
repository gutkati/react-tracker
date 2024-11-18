import React from 'react';
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

    const marks = (date) => {
        const dayData = days.find(day => day.date === date.toISOString().split('T')[0]);

        // Если для дня найдены трекеры, создаем для них элементы; иначе возвращаем пустой массив
        return dayData
            ? dayData.arrTracker.map(tracker => (
                <div
                    key={tracker.id}
                    style={{backgroundColor: tracker.color}}
                    className={styles.mark__circle}
                    data-tooltip={tracker.name}
                    onClick={() => removeMarkTracker(tracker.id)}  // Для удаления трекера
                />
            ))
            : [];  // Пустой массив, если нет трекеров для дня
    };

    function removeMarkTracker(id) {
        let nowDate = new Date().toISOString().split('T')[0] // перевести в формат YYYY-MM-DD

        // если день текущий, применяем удаление отметок
        if (date.toISOString().split('T')[0] === nowDate) {
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
            <div>
                {/*{markShow}*/}
                {marks(date)}
            </div>

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
