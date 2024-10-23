import {useState} from 'react'
import styles from './App.module.css'
import Logo from "./components/logo/logo";
import Title from "./components/title/title";
import InputStyle from "./components/inpytStyle/inputStyle";
import Header from "./components/header/header";
import Subtitle from "./components/subtitle/subtitle";
import Footer from "./components/footer/footer";


function App() {

    return (
        <div className={styles.app}>
            <Header/>
            <Subtitle/>
            <Footer/>
        </div>
    )
}

export default App
