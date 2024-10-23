import React from 'react';
import styles from './Subtitle.module.css'

const Subtitle = () => {
    let date = new Date()
    let day = date.getDate()
    let month = addZeroDate(date.getMonth() + 1)
    let year = date.getFullYear()

    function addZeroDate(num) {
        if (num <= 9) {
            return '0' + num
        } else {
        }
        return num
    }

    return (
        <div className={styles.subtitle}>
            <p className={styles.text}>14 дней</p>
            <h2 className={styles.title}>{`${day}.${month}.${year}`}</h2>
        </div>
    );
};

export default Subtitle;