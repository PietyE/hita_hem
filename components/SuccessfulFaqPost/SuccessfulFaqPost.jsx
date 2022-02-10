import React from 'react';
import Modal from "../ui/Modal";
import Image from "next/image";
import Icon from "../../public/images/success.svg";
import {
    setShowSuccessfulFAQPopup
} from "../../redux/actions/authPopupWindows";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";

function SuccessfulFaqPost({show}) {
    const { t } = useTranslation();
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(setShowSuccessfulFAQPopup(false))
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
            <h2 className='faq_popup_title'>{t("successfulFaqPopup.title")}</h2>

        </Modal>
    );
}

export default SuccessfulFaqPost;