import React from 'react';
import styles from './ButtonUnderline.module.css'

const ButtonUnderline = ({text, onHandleClick}) => {
    return (

            <button onClick={onHandleClick} className={styles.btn}>{text}</button>

    );
};

export default ButtonUnderline;