import React from 'react';
import styles from './InfoBox.module.css'

const InfoBox = () => {
    return (
        <div className={styles.info__box}>
            <p className={styles.text}>
                Универсальный трекер дел — это инструмент, предназначенный для эффективного управления и отслеживания задач в различных сферах жизни, таких как работа, учёба, спорт или личные цели.Он помогает структурировать задачи, следить за их выполнением, контролировать сроки и мотивирует на достижение поставленных целей.
            </p>
        </div>
    );
};

export default InfoBox;