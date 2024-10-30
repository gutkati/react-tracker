import React, {useState} from 'react';
import Logo from "../../components/logo/logo";
import Title from "../../components/title/title";
import stylesEdit from './EditTracker.module.css'
import InputStyle from "../../components/inpytStyle/inputStyle";
import Checkbox from "../../components/checkbox/checkbox";
import Footer from "../../components/footer/footer";
import ButtonUnderline from "../../components/buttonUnderline/buttonUnderline";
import {arrColors} from "../../arrays/arrays";
import {NavLink} from "react-router-dom";

const EditTracker = () => {

    const [checked, setChecked] = useState(true)
    const [modal, setModal] = useState(false)

    const stopPropagation = (e) => {
        e.stopPropagation()
    }

    const onCheckedChange = () => {
        setChecked(!checked)
    }

    function showModal() {
        setModal(true)
    }

    function closeModalColor() {
        setModal(false)
    }

    return (
        <div className={stylesEdit.edit__tracker} onClick={closeModalColor}>
            <header className={stylesEdit.header}>
                <div className={stylesEdit.logo}>
                    <Logo/>
                </div>
                <div className={stylesEdit.container__title}>
                    <Title text='Настройки'/>
                </div>
            </header>

            <form className={stylesEdit.edit__form}>
                <div className={stylesEdit.container__input}>
                    <p className={stylesEdit.title__input}>Навание:</p>
                    <InputStyle
                        size='size__big'
                        type='text'
                    />
                </div>

                <div className={stylesEdit.container__input}>
                    <p className={stylesEdit.title__input}>Количество в неделю:</p>
                    <InputStyle
                        size='size__big'
                        type='number'
                    />
                </div>

                <div className={stylesEdit.container__input} onClick={(e) => stopPropagation(e)}>
                    <p className={stylesEdit.title__input}>Цвет кнопки:</p>

                    <div className={stylesEdit.container__color2}>
                        <div className={stylesEdit.btn__circle}/>
                        <div className={stylesEdit.btn__mark} onClick={showModal}/>
                    </div>
                </div>


                <div className={stylesEdit.container__input}>
                    <p className={stylesEdit.title__input}>Показывать уведомления:</p>
                    <Checkbox
                        info='showInfo'
                        checked={checked}
                        onChecked={onCheckedChange}
                    />
                </div>

                <div className={stylesEdit.gradient__border}>
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
                <ButtonUnderline text='удалить трекер'/>

            </div>
            {
                modal ?
                    <div className={stylesEdit.modal__colors} onClick={(e) => stopPropagation(e)}>
                        <div className={stylesEdit.list__colors}>
                            {arrColors.map((color, index) => (
                                <div key={index} className={`${stylesEdit.circle__color} ${stylesEdit[color]}`}/>
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