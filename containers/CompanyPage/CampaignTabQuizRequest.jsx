import React from 'react';
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import Button from "../../components/ui/Button";
import {getQuiz} from "../../redux/actions/user";

const CampaignTabQuizRequest = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();


    const handleShowQuiz = () => {
        dispatch(getQuiz());
    };
    return (
        <div className="campaigns_tab_sign-up_container campaigns_tab_request_quiz_container">
            <h2 className="campaigns_tab_sign-up_title">
                {t("company_page.tab_quiz_request.title")}
            </h2>
            <p className="campaigns_tab_sign-up_text">
                {t("company_page.tab_quiz_request.text")}
            </p>
            <Button
                colorStyle="dark-violet"
                className="campaigns_tab_sign-up_button"
                onClick={handleShowQuiz}
            >
                {t("company_page.tab_quiz_request.pass_quiz")}
            </Button>

        </div>
    );
}

export default CampaignTabQuizRequest;