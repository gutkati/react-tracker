import React, {useState} from 'react';
import styles from './BtnTracker.module.css'
import InputStyle from "../inpytStyle/inputStyle";

const BtnTracker = ({name, quantity, color, message}) => {

    const [modalShow, setModalShow] = useState(false)

    function openModal() {
        setModalShow(true)
    }

    function closeModal() {
        setModalShow(false)
    }

    return (
        <div className={styles.container}>
            <div className={styles.btn__tracker}>
                <p className={styles.mark__calendar}>{name}</p>
                {
                    modalShow
                        ?
                        <button className={styles.arrow__modal_close} onClick={closeModal}/>
                        :
                        <button className={styles.arrow__modal} onClick={openModal}/>
                }

                <div className={styles.mark}>
                    <p>2</p>
                </div>
            </div>
            {
                modalShow
                    ?
                    <div className={styles.modal}>
                        <p><span>2 дня </span>до конца недели</p>
                        <p>Запланировано: <span>5</span></p>
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