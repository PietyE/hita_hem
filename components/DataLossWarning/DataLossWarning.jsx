import React, {useCallback} from 'react';
import Modal from "../ui/Modal";
import Image from "next/image";
import Icon from "../ShowConfirmationOfAccountDeletion/images/icon.svg";
import Button from "../ui/Button";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {setShowDataLossWarning, setShowQuiz} from "../../redux/actions/authPopupWindows";

function DataLossWarning({show}) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const _setShowConfirmationOfAccountDeleting = useCallback(() => {
        dispatch(setShowDataLossWarning(false));
    }, [dispatch]);
    const _setShowQuiz = useCallback(() => {
        dispatch(setShowQuiz(false));
    }, [dispatch]);

    const handleClose = () => {
        _setShowQuiz()
        _setShowConfirmationOfAccountDeleting()
    }
    return (
        <Modal
            show={show}
            onHide={_setShowConfirmationOfAccountDeleting}
            backdrop={true}
            keyboard={false}
            centered={true}
            className="deleting_account_modal_container"
            bodyClassName="deleting_account_modal_dialog_container"
        >
            <div className="deleting_account_icon_container">
                <Image src={Icon} alt="icon" />
            </div>
            <h2 className="deleting_account_title">
                {t("dataLossWarning.title")}
            </h2>
            <span className="deleting_account_text">
        {t("dataLossWarning.text")}
      </span>
            <div className="deleting_account_button_wrapper">
                <Button
                    className="data_loss_warning_button"
                    colorStyle="dark-green"
                    onClick={handleClose}
                >
                    {t("dataLossWarning.confirm")}
                </Button>
                <Button
                    className="data_loss_warning_button"
                    colorStyle="dark-green"
                    onClick={_setShowConfirmationOfAccountDeleting}
                >
                    {t("dataLossWarning.return")}
                </Button>
            </div>
        </Modal>
    );
}

export default DataLossWarning;