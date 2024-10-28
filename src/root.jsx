import React from 'react';
import styles from "./App.module.css";
import Header from "./components/header/header";
import Subtitle from "./components/subtitle/subtitle";
import MainTracker from "./components/mainTracker/mainTracker";
import Footer from "./components/footer/footer";

const Root = () => {
    return (

            <div className={styles.app}>
                <Header/>
                <Subtitle/>
                <MainTracker/>
                <Footer/>
            </div>

    );
};

export default Root;