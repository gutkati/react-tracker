import React from 'react';
import styles from './InfoBox.module.css'

const InfoBox = ({text}) => {
    return (
        <div className={styles.info__box}>
            <p className={styles.text}
               lang="ru"
            >
                {text}
            </p>
        </div>
    );
};

export default InfoBox;