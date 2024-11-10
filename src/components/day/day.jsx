import React from 'react';
import styles from "./Day.module.css";
import {gradientColor, arrMonths, days} from '../../arrays/arrays'

const Day = ({index, date, markShow}) => {

    let gradient = gradientColor[index]
    const currentDate = new Date()

    // console.log('333', currentDate)

    const num = date.getDate()
    const month = arrMonths[date.getMonth()]
    const day = days[date.getDay()]

    // console.log('currentDate', currentDate.toDateString())
    // console.log('date', date.toDateString())

    // Чтобы сравнить две даты, лучше использовать toDateString(), это позволит сравнить только день, месяц и год
    return (
        <div className={styles.box__day}>
            {currentDate.toDateString() === date.toDateString() ? markShow : ''}
            <div
                className={`${styles.square} ${currentDate.toDateString() === date.toDateString() ? styles.mark__square : ''}`}>
                <p>{day}</p>
            </div>
            <div className={`${styles.circle} ${styles[gradient]}`}>
                <div className={styles.little__circle}>
                    <p>{num}</p>
                </div>
            </div>
            <p className={styles.month}>{month}</p>
        </div>
    );
};

export default Day;