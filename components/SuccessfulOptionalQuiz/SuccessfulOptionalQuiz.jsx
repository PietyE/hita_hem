import React from 'react';
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {setShowOptionalQuizMessage} from "../../redux/actions/authPopupWindows";
import Modal from "../ui/Modal";
import Image from "next/image";
import Icon from "../../public/images/success.svg";

const SuccessfulOptionalQuiz = ({show}) => {
    const { t } = useTranslation();
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(setShowOptionalQuizMessage(false))
    }
    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop={true}
            keyboard={false}
            centered={true}
            className="faq_popup_modal"
            bodyClassName="faq_popup_body"
            dialogClassName='faq_popup_dialog'
        >
            <div className="faq_popup_icon_container">
                <Image src={Icon} alt={Icon ? 'icon' : ' '}/>
            </div>
            <h2 className='faq_popup_title'>{t("successfulOptionalQuiz.title")}</h2>

        </Modal>
    );
}

export default SuccessfulOptionalQuiz;