import React, {useState} from 'react';
import styles from './BtnTracker.module.css'
import InputStyle from "../inpytStyle/inputStyle";
import {Link, useParams, NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectAllTrackers, selectTrackerId, trackerChecked} from "../../parts/trackers/trackersSlice";
import {selectAllDays} from "../../parts/days/daysSlice";
import Checkbox from "../checkbox/checkbox";
import ModalInfo from "../modalInfo/modalInfo";

const BtnTracker = ({id, name, quantity, color, message, to, onClick, checked}) => {


    let params = useParams()
    const {trackerId} = params
    const tracker = useSelector(state => selectTrackerId(state, trackerId))
    const trackers = useSelector(selectAllTrackers)
    const days = useSelector(selectAllDays)
    const dispatch = useDispatch()

    console.log('id:', id)

    let date = new Date
    const dayWeek = date.getDay()
    let endWeek = showDayWeek(dayWeek)

    // получить массив текущей недели
    function getCurrentWeek() {
        const today = new Date();
        const dayOfWeek = today.getDay()
        const startOfCurrentWeek = new Date(today)

        // Определяем начало текущей недели (понедельник)
        startOfCurrentWeek.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1))

        const daysWeek = []
        for (let i = 0; i < 7; i++) {
            const day = new Date(startOfCurrentWeek)
            day.setDate(startOfCurrentWeek.getDate() + i)
            daysWeek.push(day.toISOString().split('T')[0]) // преобразовать в дату YYY-MM-DD
        }

        return daysWeek
    }

    // получить количество выполненых трекеров
    function getNumMarkWeek() {
        let daysWeek = getCurrentWeek()
        let numTracker = 0

        daysWeek.map(date => {
            days.find(day => {
                if (date === day.date) {
                    day.arrTracker.find(mark => {
                        if (mark.id === id) {
                            numTracker += 1
                        }
                    })
                }
            })
        })

        return numTracker
    }

    // количество выполненных трекеров
    const checkTracker = getNumMarkWeek()

    // посчитать остаток невыполненых трекеров
    const remainder = quantity - checkTracker

    // с пятницы считает сколько осталось до конца недели
    function showDayWeek(dayWeek) {
        if (dayWeek > 4) {
            return 7 - dayWeek
        } else if (dayWeek === 0) {
            return 0
        }
    }

    const onCheckedChange = () => {
        const tracker = trackers.find(tracker => tracker.id === id)

        if (tracker) {
            dispatch(
                trackerChecked({
                    id: tracker.id,
                    checked: !tracker.checked
                })
            )
        }

    }

    return (
        <div className={styles.container}>

            <div className={styles.container__btn}>

                <NavLink to={`/edit/${id}`} className={styles.modal__edit}/>

                <div
                    className={styles.btn__tracker}
                    style={{backgroundColor: color}}
                    onClick={() => onClick(trackerId, name, color)}
                >

                    <div className={styles.btn__tracker_small} style={{"--btn-color": color}} data-color={color}>

                        <p className={styles.mark__calendar}>
                            {name}
                        </p>

                    </div>
                </div>


            </div>

            {
                message && (dayWeek > 4 || dayWeek === 0) && (remainder !== 0) && (checkTracker < quantity)
                    ?
                    <>
                        <div className={`${styles.mark} ${styles.mark__red}`}>
                            <p>{quantity}/{checkTracker}</p>
                        </div>
                        <div className={styles.modal__info_day}>
                            <ModalInfo info={`осталось дней: ${endWeek}`}/>
                        </div>
                    </>
                    :
                    <div className={styles.mark}>
                        <p><span>{quantity}/</span>{checkTracker}</p>
                    </div>
            }

            {
                (checkTracker == quantity || checkTracker > quantity) &&
                <div className={`${styles.mark} ${styles.mark__green}`}>
                    <p>{quantity}/{checkTracker}</p>
                </div>
            }

            <div className={styles.checkbox}>
                <Checkbox
                    info='showInfo'
                    checked={checked}
                    onChecked={onCheckedChange}
                />

                <div className={styles.modal__info}>
                    <ModalInfo info='Скрыть трекер'/>
                </div>
            </div>


        </div>
    )
}


export default BtnTracker;

{/*{*/
}
{/*    modalShow*/
}
{/*        ?*/
}
{/*        <button className={styles.arrow__modal_close} onClick={closeModal}/>*/
}
{/*        :*/
}
{/*        <button className={styles.arrow__modal} onClick={openModal}/>*/
}
{/*}*/
}

// {
//                 modalShow
//                     ?
//                     <div className={styles.modal} style={{backgroundColor: color}}>
//                         {
//                             dayWeek > 4 || dayWeek === 0
//                                 ?
//                                 <p>Осталось дней: <span>{endWeek}</span></p>
//                                 :
//                                 ''
//                         }
//
//                         <p>Запланировано: <span>{quantity}</span></p>
//                         <p>Выполнено: <span>{checkTracker}</span></p>
//                         <Link to={to}><InputStyle type='button' value='Настройки'/></Link>
//                     </div>
//                     :
//                     ''
//             }