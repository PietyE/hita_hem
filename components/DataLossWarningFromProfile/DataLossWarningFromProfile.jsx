import React, {useCallback} from 'react';
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {
    setShowDataLossWarningFromProfile,
} from "../../redux/actions/authPopupWindows";
import Modal from "../ui/Modal";
import Image from "next/image";
import Icon from "../ShowConfirmationOfAccountDeletion/images/icon.svg";
import Button from "../ui/Button";
import {setActiveTab} from "../../redux/actions/user";

const DataLossWarningFromProfile = ({data}) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();


    const _setShowDataLossWarningFromProfile = useCallback(() => {
        dispatch(setShowDataLossWarningFromProfile(''));
    }, [dispatch]);

    const _setActiveTab = useCallback((data) => {
        dispatch(setActiveTab(data));
    }, [dispatch]);



    const handleClose = () => {
        _setShowDataLossWarningFromProfile()
        _setActiveTab(data)

    }
    return (
        <Modal
            show={!!data}
            onHide={_setShowDataLossWarningFromProfile}
            backdrop={true}
            keyboard={false}
            centered={true}
            className="deleting_account_modal_container"
            bodyClassName="deleting_account_modal_dialog_container"
        >
            <div className="deleting_account_icon_container">
                <Image src={Icon} alt={Icon ? 'icon' : ' '} />
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
                    colorStyle="dark-violet"
                    onClick={handleClose}
                >
                    {t("dataLossWarning.confirm")}
                </Button>
                <Button
                    className="data_loss_warning_button"
                    colorStyle="dark-violet"
                    onClick={_setShowDataLossWarningFromProfile}
                >
                    {t("dataLossWarning.return")}
                </Button>
            </div>
        </Modal>
    );
}

export default DataLossWarningFromProfile;