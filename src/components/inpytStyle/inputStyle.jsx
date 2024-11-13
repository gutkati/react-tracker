import React from 'react';
import styles from './InputStyle.module.css'

const InputStyle = ({
                        value,
                        type,
                        onChange,
                        onClick,
                        size,
                        placeholder,
                        maxlength,
                        min,
                        max,
                        onBlur,
                    }) => {
    return (
        <div>
            <input className={`${styles.input} ${styles[size]}`}
                   value={value}
                   type={type}
                   onChange={onChange}
                   onClick={onClick}
                   placeholder={placeholder}
                   maxLength={maxlength}
                   min={min}
                   max={max}
                   onBlur={onBlur}
            />
        </div>
    );
};

export default InputStyle;