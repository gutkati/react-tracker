import React, {useState} from 'react';
import styles from './Main.module.css'
import InfoBox from "../infoBox/infoBox";
import {gradientColor} from '../../arrays/arrays'
import InputStyle from "../inpytStyle/inputStyle";

const Main = () => {

    const arrGradient = gradientColor
    // const arrListTrack = ['Все трекеры']
    //
    // const [listTrack, setListTrack] = useState(arrListTrack)

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
                    {arrGradient.map((gradient, index) => (
                        <div key={index} className={styles.box__day}>
                            <div className={styles.square}>
                                <p>пн</p>
                            </div>
                            <div className={`${styles.circle} ${styles[gradient]}`}>
                                <div className={styles.little__circle}>
                                    <p>21</p>
                                </div>
                            </div>
                            <p className={styles.month}>окт</p>
                        </div>
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
};

export default Main;