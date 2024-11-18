import React from 'react';
import styles from './Logo.module.css'

const Logo = ({onOpenPage}) => {
    return (
        <div className={styles.logo} onClick={onOpenPage}>
        </div>
    );
};

export default Logo;