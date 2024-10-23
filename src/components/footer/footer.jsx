import React from 'react';
import styles from './Footer.module.css'

const Footer = () => {
    let date = new Date()
    let year = date.getFullYear()
    return (
        <div className={styles.footer}>
            <p className={styles.text}>{`${year} © Екатерина Шмелева`}</p>
        </div>
    );
};

export default Footer;