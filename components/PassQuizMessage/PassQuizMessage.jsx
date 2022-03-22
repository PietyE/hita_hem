import React from 'react';
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import Button from "../ui/Button";
import {getQuiz} from "../../redux/actions/user";

const PassQuizMessage = ({className}) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const handleShowQuiz = () => {
        dispatch(getQuiz());
    };


    return (
        <div className={`sign_up_message_container ${className}`}>
      <p className="sign_up_message">
        {t("request_quiz_message.sign_up_text_one")}&nbsp;
          </p>
          <Button colorStyle="link" onClick={handleShowQuiz} className='sign_up_message_link'>
          {t("request_quiz_message.sign_up_link")}
        </Button>&nbsp;
          <p>
          {t("request_quiz_message.sign_up_text_two")}
      </p>
        </div>
    );
}

export default PassQuizMessage;