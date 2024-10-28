import React from 'react';
import styles from './ButtonUnderline.module.css'

const ButtonUnderline = ({text}) => {
    return (

            <button className={styles.btn}>{text}</button>

    );
};

export default ButtonUnderline;