import React, {useState} from 'react';
import styles from './BtnTracker.module.css'
import InputStyle from "../inpytStyle/inputStyle";

const BtnTracker = ({name, quantity, color, message}) => {

    const [modalShow, setModalShow] = useState(false)
    let date = new Date
    const dayWeek = date.getDay()
    let endWeek = showDayWeek(dayWeek)

    // с пятницы считает сколько осталось до конца недели
    function showDayWeek(dayWeek) {
        if (dayWeek > 4) {
            return 7 - dayWeek
        } else if (dayWeek === 0) {
            return 0
        }
    }

    function openModal() {
        setModalShow(true)
    }

    function closeModal() {
        setModalShow(false)
    }


    return (
        <div className={styles.container}>
            <div className={styles.btn__tracker} style={{backgroundColor: color}}>
                <p className={styles.mark__calendar}>{name}</p>
                {
                    modalShow
                        ?
                        <button className={styles.arrow__modal_close} onClick={closeModal}/>
                        :
                        <button className={styles.arrow__modal} onClick={openModal}/>
                }

                {
                    message
                        ?
                        <div className={styles.mark}>
                            <p>2</p>
                        </div>
                        :
                        ''
                }

            </div>
            {
                modalShow
                    ?
                    <div className={styles.modal} style={{backgroundColor: color}}>
                        {
                            dayWeek > 4 || dayWeek === 0
                                ?
                                <p>Осталось дней: <span>{endWeek}</span></p>
                                :
                                ''
                        }

                        <p>Запланировано: <span>{quantity}</span></p>
                        <p>Выполнено: <span>4</span></p>
                        <InputStyle type='button' value='Настройки'/>
                    </div>
                    :
                    ''
            }

        </div>

    );
};

export default BtnTracker;