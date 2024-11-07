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

const EditTracker = () => {

    const navigate = useNavigate()
    let params = useParams()
    const {trackerId} = params

    const dispatch = useDispatch()

    const tracker = useSelector(state => selectTrackerId(state, trackerId))

    const [arrTrackers, setArrTrackers] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)

    const [name, setName] = useState(tracker.name)
    const [quantity, setQuantity] = useState(tracker.quantity)
    const [color, setColor] = useState(tracker.color)
    const [message, setMessage] = useState(tracker.message)
    const [checked, setChecked] = useState(tracker.checked)

    const onNameChange = (e) => setName(e.target.value)
    const onQuantityChange = (e) => setQuantity(e.target.value)

    const stopPropagation = (e) => {
        e.stopPropagation()
    }

    const onCheckedChange = () => {
        setMessage(!message)
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
        if (name && quantity) {
            dispatch(trackerEdit({
                    id: tracker.id, name, quantity, color, message, checked
                }
            ))
            navigate('/trackers')
        }
    }

    function removeTracker() {
        dispatch(trackerRemove({ id: tracker.id }))
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
                    <InputStyle
                        value={name}
                        size='size__big'
                        type='text'
                        onChange={onNameChange}
                        placeholder='Введите название'
                        maxlength='17'
                    />
                </div>

                <div className={stylesEdit.container__input}>
                    <p className={stylesEdit.title__input}>Количество в неделю:</p>
                    <InputStyle
                        value={quantity}
                        size='size__big'
                        type='number'
                        onChange={onQuantityChange}
                    />
                </div>

                <div className={stylesEdit.container__input} onClick={(e) => stopPropagation(e)}>
                    <p className={stylesEdit.title__input}>Цвет кнопки:</p>

                    <div className={stylesEdit.container__color2}>
                        <div className={stylesEdit.btn__circle} style={{backgroundColor: color}}/>
                        <div className={stylesEdit.btn__mark} onClick={showModal}/>
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