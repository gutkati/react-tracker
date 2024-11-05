import React from 'react';
import styles from './Checkbox.module.css'

const Checkbox = ({info, checked, onChecked}) => {

    console.log('checked', checked)
    return (

        <label className={styles.checkbox__container}>
            <input
                type="checkbox"
                name={info}
                id={info}
                defaultChecked={checked}
                onChange={onChecked}
            />
            <span className={styles.check__mark}></span>
        </label>

        // <input
        //     className={styles.checkbox}
        //     value={value}
        //     type="checkbox"
        //     name={info}
        //     id={info}
        //     defaultChecked={checked}
        //     onChange={onChecked}
        // />
    );
};

export default Checkbox;