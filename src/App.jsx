import {useState} from 'react'
import styles from './App.module.css'
import Header from "./components/header/header";
import Subtitle from "./components/subtitle/subtitle";
import Footer from "./components/footer/footer";
import Main from "./components/main/main";


function App() {

    return (
        <div className={styles.app}>
            <Header/>
            <Subtitle/>
            <Main/>
            <Footer/>
        </div>
    )
}

export default App
