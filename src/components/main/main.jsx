import React, {useState} from 'react';
import styles from './Main.module.css'
import InfoBox from "../infoBox/infoBox";
import InputStyle from "../inpytStyle/inputStyle";
import Day from "../day/day";

const Main = () => {

        // const arrListTrack = ['Все трекеры']
        //
        // const [listTrack, setListTrack] = useState(arrListTrack)

        //const [currentDate, setCurrentDare] = useState(new Date())
        const [selectedDates, setSelectedDates] = useState([])
        const currentDate = new Date()
        let arrShowDays = getDaysRange()

        // Функция для получения списка дней
        function getDaysRange() {
            let days = []
            let startDate = new Date(currentDate)
            let endDate = new Date(currentDate)

            // setDate() устанавливает день месяца указанной даты по местному времени.
            // getDate() возвращает день месяца указанной даты по местному времени
            startDate.setDate(currentDate.getDate() - 7)
            endDate.setDate(currentDate.getDate() + 6)

            for (let day = startDate; day <= endDate; day.setDate(day.getDate() + 1)) {
                days.push(new Date(day));
            }

            return days
        }

        return (
            <div className={styles.main}>
                <InfoBox/>

                <div className={styles.container__main}>
                    <div className={styles.container__marks}>
                        <button className={styles.prev}/>

                        <div className={styles.marks}></div>

                        <button className={styles.next}/>
                    </div>

                    <div className={styles.border}></div>

                    <div className={styles.container__calendar}>
                        {arrShowDays.map((date, index) => (
                            <Day
                                key={index}
                                index={index}
                                date={date}
                            />
                        ))}

                    </div>

                    <div className={styles.container__filter}>
                        <p className={styles.filter__text}>Оставить нужные трекеры</p>

                        <div className={styles.filter}>

                            <InputStyle size='size__small' value='Все трекеры'/>

                            {/*<select className={styles.filter__list}>*/}
                            {/*    {listTrack.map((track, index) => (*/}
                            {/*        <option key={index} value="">{track}</option>*/}
                            {/*    ))}*/}
                            {/*</select>*/}
                        </div>
                    </div>

                </div>
            </div>
        );
    }
;

export default Main;