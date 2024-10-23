import React from 'react';
import styles from './Logo.module.css'

const Logo = ({onOpenPage}) => {
    return (
        <div className={styles.logo} onClick={onOpenPage}>
            {/*<img className={styles.img} src="" alt="логотип"/>*/}
        </div>
    );
};

export default Logo;