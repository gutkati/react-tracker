import React from 'react';
import styles from './ModalInfo.module.css'

const ModalInfo = ({info}) => {
    return (
        <div className={styles.modal}>
            <p className={styles.modal__text}>{info}</p>
        </div>
    );
};

export default ModalInfo;