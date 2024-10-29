import React, {useState} from 'react';
import styles from "../../components/header/Header.module.css";
import Logo from "../../components/logo/logo";
import Title from "../../components/title/title";
import stylesEdit from './EditTracker.module.css'
import InputStyle from "../../components/inpytStyle/inputStyle";
import Checkbox from "../../components/checkbox/checkbox";
import Footer from "../../components/footer/footer";
import ButtonUnderline from "../../components/buttonUnderline/buttonUnderline";

const EditTracker = () => {

    const [checked, setChecked] = useState(true)

    const onCheckedChange = () => {
        setChecked(!checked)
    }

    return (
        <div className={stylesEdit.edit__tracker}>
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

                <div className={stylesEdit.container__input}>
                    <p className={stylesEdit.title__input}>Цвет кнопки:</p>
                    <div className={stylesEdit.container__color}>
                        <label className={stylesEdit.color__picker}>
                            <input type="color" id="colorInput" onInput="updateColor()"/>
                            <span className={stylesEdit.color__display}></span>
                        </label>

                        <label className={stylesEdit.check__mark}>
                            <input type="color" id="colorInput" onInput="updateColor()"/>
                            <span className={stylesEdit.check__display}></span>
                        </label>
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
                    Сохранить</div>
            </form>

            <div className={stylesEdit.container__buttons}>
                <ButtonUnderline text='к списку трекеров'/>
                <ButtonUnderline text='на главную'/>
                <ButtonUnderline text='удалить трекер'/>

            </div>

            <Footer/>
        </div>
    );
};

export default EditTracker;