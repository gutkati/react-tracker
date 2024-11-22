import React from 'react';
import styles from './ModalSuccessSave.module.css'
const ModalSuccessSave = ({showModal}) => {
    return (
        <div className={showModal ? styles.container__save : styles.show}>
            <h3 className={styles.title}>Трекер создан</h3>
            <div className={styles.box__img}>
                <div className={styles.img}/>
            </div>

        </div>
    );
};

export default ModalSuccessSave;