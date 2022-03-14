import React, {useEffect} from 'react';
import Modal from "../ui/Modal";
import Image from "next/image";
import Icon from "../../public/images/message.svg";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {setShowFirstLoginPopup} from "../../redux/actions/authPopupWindows";
import {getIsBankIdResident, getIsSocialAccount} from "../../redux/reducers/user";
import {sendSignUpToGTM} from "../../utils/tagManagerScripts";

function SuccessfulFirstLogin({show}) {
    const { t } = useTranslation();
    const dispatch = useDispatch()
    const isSocialAccount = useSelector(getIsSocialAccount)
    const isBankIdResident = useSelector(getIsBankIdResident)
    let signUpMethod;
    if(isSocialAccount.length > 0){
        signUpMethod = 'google'
    }else if(isBankIdResident){
        signUpMethod = 'bankId'
    }else{
        signUpMethod = 'standard'
    }

    useEffect(()=>{
        if(signUpMethod){
            sendSignUpToGTM(signUpMethod)
        }
    },[signUpMethod])

    const handleClose = () => {
        dispatch(setShowFirstLoginPopup(false))
    }
    return (

        <Modal
            show={show}
            onHide={handleClose}
            backdrop={true}
            keyboard={false}
            centered={true}
            className="quiz_error_modal"
            bodyClassName="quiz_error_body"
            dialogClassName='quiz_error_dialog'
        >
            <div className="successful_investment_icon_container quiz_error_dialog_icon_container">
                <Image src={Icon} alt={Icon ? 'icon' : ' '}/>
            </div>
            <h2 className='successful_investment_title'>{t("successful_first_login.title")}</h2>
            <p className='successful_investment_text'>{t("successful_first_login.text")}</p>

        </Modal>
    );
}

export default SuccessfulFirstLogin;