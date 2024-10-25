import React from 'react';
import styles from './InputStyle.module.css'

const InputStyle = ({value, type, onChange, onClick, size}) => {
    return (
        <div>
            <input className={`${styles.input} ${styles[size]}`} value={value} type={type} onChange={onChange} onClick={onClick}/>
        </div>
    );
};

export default InputStyle;