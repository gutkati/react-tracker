import React, {useState} from 'react';
import Logo from "../../../components/logo/logo";
import Title from "../../../components/title/title";
import stylesEdit from './EditTracker.module.css'
import InputStyle from "../../../components/inpytStyle/inputStyle";
import Checkbox from "../../../components/checkbox/checkbox";
import Footer from "../../../components/footer/footer";
import ButtonUnderline from "../../../components/buttonUnderline/buttonUnderline";
import {colors} from "../../../arrays/arrays";
import {NavLink, useParams, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {trackerEdit, selectTrackerId, trackerRemove} from "../trackersSlice";
import styles from "./EditTracker.module.css";

const EditTracker = () => {

    const navigate = useNavigate()
    let params = useParams()
    const {trackerId} = params

    const dispatch = useDispatch()

    const tracker = useSelector(state => selectTrackerId(state, trackerId))

    const [isModalOpen, setIsModalOpen] = useState(false)

    const [name, setName] = useState(tracker.name)
    const [quantity, setQuantity] = useState(tracker.quantity)
    const [color, setColor] = useState(tracker.color)
    const [message, setMessage] = useState(tracker.message)
    const [checked, setChecked] = useState(tracker.checked)

    const [errorName, setErrorName] = useState('')
    const [errorQuantity, setErrorQuantity] = useState('')

    console.log("quantity", typeof quantity)

    const onNameChange = (e) => setName(e.target.value)

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
        validateQuantity(Number(quantity))
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
            dispatch(trackerEdit({
                    id: tracker.id, name, quantity, color, message, checked
                }
            ))
            navigate('/trackers')
        }
    }

    function removeTracker() {
        dispatch(trackerRemove({id: tracker.id}))
        navigate('/trackers')
    }

    return (
        <div className={stylesEdit.edit__tracker} onClick={closeModalColor}>
            <header className={stylesEdit.header}>
                <NavLink to='/' className={stylesEdit.logo}>
                    <Logo/>
                </NavLink>
                <div className={stylesEdit.container__title}>
                    <Title text='Настройки'/>
                </div>
            </header>

            <form className={stylesEdit.edit__form}>
                <div className={stylesEdit.container__input}>
                    <p className={stylesEdit.title__input}>Название:</p>
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


                {/*<div className={stylesEdit.container__input} onClick={(e) => stopPropagation(e)}>*/}
                {/*    <p className={stylesEdit.title__input}>Количество:</p>*/}

                {/*    <div className={stylesEdit.container__color2}>*/}
                {/*        <div>{quantity}</div>*/}

                {/*        <div className={styles.container__arrow}>*/}
                {/*            <div className={styles.btn__mark_close} onClick={incNum}/>*/}

                {/*            <div className={styles.btn__mark} onClick={decNum}/>*/}
                {/*        </div>*/}


                {/*    </div>*/}
                {/*</div>*/}


                <div className={stylesEdit.container__input} onClick={(e) => stopPropagation(e)}>
                    <p className={stylesEdit.title__input}>Цвет кнопки:</p>

                    <div className={stylesEdit.container__color2}>
                        <div className={stylesEdit.btn__circle} style={{backgroundColor: color}}/>
                        {
                            isModalOpen
                                ?
                                <div className={styles.btn__mark_close} onClick={closeModalColor}/>
                                :
                                <div className={styles.btn__mark} onClick={showModal}/>
                        }
                    </div>
                </div>


                <div className={stylesEdit.container__input}>
                    <p className={stylesEdit.title__input}>Показывать уведомления:</p>
                    <Checkbox
                        info='showInfo'
                        checked={message}
                        onChecked={onCheckedChange}
                    />
                </div>

                <div className={stylesEdit.gradient__border} onClick={saveDataTracker}>
                    Сохранить
                </div>
            </form>

            <div className={stylesEdit.container__buttons}>
                <NavLink to='/trackers'>
                    <ButtonUnderline text='к списку трекеров'/>
                </NavLink>
                <NavLink to='/'>
                    <ButtonUnderline text='на главную'/>
                </NavLink>
                <ButtonUnderline text='удалить трекер' onHandleClick={removeTracker}/>
            </div>
            {
                isModalOpen ?
                    <div className={stylesEdit.modal__colors} onClick={(e) => stopPropagation(e)}>
                        <div className={stylesEdit.list__colors}>
                            {colors.map((color, index) => (
                                <div
                                    key={index}
                                    className={stylesEdit.circle__color}
                                    style={{backgroundColor: color}}
                                    onClick={() => handleColorSelect(color)}
                                />
                            ))}
                        </div>
                    </div>
                    : ''
            }

            <Footer/>
        </div>
    );
};

export default EditTracker;