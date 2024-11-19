import React, {useEffect, useState} from 'react';
import Logo from "../../../components/logo/logo";
import Title from "../../../components/title/title";
import styles from '../../trackers/editTrcaker/EditTracker.module.css'
import InputStyle from "../../../components/inpytStyle/inputStyle";
import Checkbox from "../../../components/checkbox/checkbox";
import Footer from "../../../components/footer/footer";
import ButtonUnderline from "../../../components/buttonUnderline/buttonUnderline";
import {colors} from "../../../arrays/arrays";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectAllTrackers, trackerAdded} from "../trackersSlice";
import stylesEdit from "../editTrcaker/EditTracker.module.css";


const CreateTracker = () => {
    const dispatch = useDispatch()
    const trackers = useSelector(selectAllTrackers)

    const [isModalOpen, setIsModalOpen] = useState(false)

    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState('1')
    const [color, setColor] = useState('#0AB0E0')
    const [message, setMessage] = useState(true)
    const [checked, setChecked] = useState(true)

    const [errorName, setErrorName] = useState('')
    const [errorQuantity, setErrorQuantity] = useState('')

    const [showTracker, setShowTracker] = useState([null])

    const onNameChange = (e) => {
        setName(e.target.value)
    }

    const handleBlurName = () => {
        validateName(name)
    }

    function validateName(name) {
        if (name.length === 0) {
            setErrorName('Заполните поле')
            return false
        }
        setErrorName('')
        return true
    }

    const onQuantityChange = (e) => setQuantity(e.target.value)

    const handleBlurQuantity = () => {
        validateQuantity(quantity)
    }

    function validateQuantity(quantity) {
        let num = /^\d+$/
        if (quantity === 0 || quantity === "" || quantity === "0") {
            setErrorQuantity('Введите количество')
            return false
        } else if (!num.test(quantity)) {
            setErrorQuantity('Введите положительное число')
            return false
        } else if (Number(quantity) > 0) {
            setErrorQuantity('')
            return true
        } else {
            setErrorQuantity('Введите положительное число');
            return false;
        }

    }

    const stopPropagation = (e) => {
        e.stopPropagation()
    }

    const onCheckedChange = () => {
        setMessage(!message)
    }

    function incNum() {
        let res = Number(quantity)
        if (res < 99) {
            setQuantity(res + 1)
        }
    }

    function decNum() {
        let res = Number(quantity)
        if (res > 1) {
            setQuantity(res - 1)
        }
    }

    function showModal() {
        setIsModalOpen(true)
    }

    function closeModalColor() {
        setIsModalOpen(false)
    }

    function handleColorSelect(color) {
        setIsModalOpen(false)
        setColor(color)
    }


    function saveDataTracker() {
        if (name && quantity > 0) {
            dispatch(trackerAdded(name, quantity, color, message, checked))
            setName('')
            setQuantity('1')
            // setShowTracker([showTracker.push(color)])
            //navigate(`/editTracker/${trackerId}`)

        } else {
            validateName(name)
            validateQuantity(quantity)
            errorName
            errorQuantity
        }
    }

    useEffect(() => {
        let arrTracker = []
        trackers.map(track => {
            arrTracker.push(track.color)

        })
        setShowTracker(arrTracker)

    }, [trackers])


    return (
        <div className={styles.edit__tracker} onClick={closeModalColor}>
            <header className={styles.header}>
                <NavLink to='/' className={styles.logo}>
                    <Logo/>
                </NavLink>
                <div className={styles.container__title}>
                    <Title text='Новый трекер'/>
                </div>
            </header>

            <form className={styles.edit__form}>
                <div className={styles.container__input}>
                    <p className={styles.title__input}>Название:</p>
                    <div className={styles.box__input}>
                        <InputStyle
                            value={name}
                            size='size__big'
                            type='text'
                            onChange={onNameChange}
                            placeholder='Введите название'
                            maxlength='17'
                            onBlur={handleBlurName}
                        />
                        <label className={styles.label}>{errorName}</label>
                    </div>

                </div>

                <div className={stylesEdit.container__input}>
                    <p className={stylesEdit.title__input}>Количество в неделю:</p>
                    <div className={`${styles.box__input} ${styles.position}`}>
                        <InputStyle
                            value={quantity}
                            size='size__big'
                            type=''
                            onChange={onQuantityChange}
                            onBlur={handleBlurQuantity}
                        />
                        <div className={styles.container__arrow}>
                            <div className={styles.btn__mark_close} onClick={incNum}/>

                            <div className={styles.btn__mark} onClick={decNum}/>
                        </div>
                        <label className={styles.label}>{errorQuantity}</label>
                    </div>
                </div>

                <div className={styles.container__input} onClick={(e) => stopPropagation(e)}>
                    <p className={styles.title__input}>Цвет кнопки:</p>

                    <div className={styles.container__color2}>
                        <div className={styles.btn__circle} style={{backgroundColor: color}}/>
                        {
                            isModalOpen
                                ?
                                <div className={styles.btn__mark_close} onClick={closeModalColor}/>
                                :
                                <div className={styles.btn__mark} onClick={showModal}/>
                        }

                    </div>
                </div>


                <div className={styles.container__input}>
                    <p className={styles.title__input}>Показывать уведомления:</p>
                    <Checkbox
                        info='showInfo'
                        checked={message}
                        onChecked={onCheckedChange}
                    />
                </div>

                <div className={styles.gradient__border} onClick={saveDataTracker}>
                    Сохранить
                </div>
            </form>

            <div className={styles.container__buttons}>
                {/*<NavLink to='/trackers'>*/}
                {/*    <ButtonUnderline text='к списку трекеров'/>*/}
                {/*</NavLink>*/}
                <NavLink to='/'>
                    <ButtonUnderline text='на главную'/>
                </NavLink>
            </div>
            {
                isModalOpen ?
                    <div className={styles.modal__colors} onClick={(e) => stopPropagation(e)}>
                        <div className={styles.list__colors}>
                            {colors.map((color, index) => (
                                <div
                                    key={index}
                                    className={styles.circle__color}
                                    style={{backgroundColor: color}}
                                    onClick={() => handleColorSelect(color)}
                                />
                            ))}
                        </div>
                    </div>
                    : ''
            }

            <div className={styles.save__tracker}>
                {
                    showTracker.length
                        ?
                        showTracker.map((color, index) => (
                            <div
                                key={index}
                                className={styles.show__color}
                                style={{backgroundColor: color}}
                            />
                        ))
                        :
                        ''
                }
            </div>
            <Footer/>
        </div>
    );
};

export default CreateTracker;