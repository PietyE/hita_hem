import React, {useEffect, useState} from 'react';
import Image from "next/image";
import WarningIcon from 'public/images/attention.svg';
import {useTranslation} from "react-i18next";

const QuizItem = ({data, index, onSelect, warningList, userQuizAnswers}) => {
    const {t} = useTranslation();
    const {pk, text, answers, optional} = data
    const [showWarning, setShowWarning] = useState(null)
    const [selectedAnswer, setSelectedAnswer] = useState(null)

    useEffect(() => {
        if(userQuizAnswers?.length > 0){
        const questionInfo = userQuizAnswers.find((answer)=>answer?.question_id === pk)
            setSelectedAnswer(questionInfo?.pk)
        }

    }, [])

    useEffect(() => {
        if (warningList.includes(pk.toString())) {
            setShowWarning(true)
        }
    }, [warningList])

    let _warningStyle = showWarning ? 'quiz_item_warning' : null
    const saveAnswer = (e) => {
        if(optional){
            onSelect(e.target.value, e.target.dataset.id)
        }else{
            if(userQuizAnswers?.length >0 ){
                return
            }else{
                onSelect(e.target.value, `answer${index + 1}`)
            }
        }
        setShowWarning(false)
        setSelectedAnswer(e.target.value)
    }

    return (
        <div className = {`quiz_item ${_warningStyle}`}>
            {showWarning &&
            <div className = 'quiz_item_warning_notification'>
                <Image src = {WarningIcon} alt = 'attention'/>
                <span>{t("quiz.error_text")}</span>
            </div>
            }
            <h3 className = 'quiz_item_title'>{optional ? text : text+'*'}</h3>
            {answers?.length &&
            answers.map(option => {
                    const _textWarning = showWarning && option.pk === Number(selectedAnswer) ? 'quiz_text_warning' : null
                let _radioStyle = 'quiz_item_option_radio_check'
                if(Number(selectedAnswer) === option.pk){

                    _radioStyle = 'quiz_item_option_radio_check_active zzz'
                }
                if(showWarning && option.pk === Number(selectedAnswer)){
                    _radioStyle = 'quiz_item_option_radio_check_warning quiz_item_option_radio_check_active'
                }

                const _style = {
                    backgroundColor: userQuizAnswers?.length >0 && !optional ? '#d0d0d0' : ''
                }

                return (
                        <label key = {option?.pk} className = {`quiz_item_option_label ${_textWarning}`}>
                            <input type = 'radio' value = {option.pk} name = {pk} data-id = {pk}
                                   onChange = {saveAnswer}
                                   className = 'quiz_item_option_radio'/>
                            <div className = {_radioStyle} style={_style}>
                                <span className = 'quiz_item_option_radio_check_inner'/>
                            </div>
                            <span className = 'quiz_item_option_label_text'>{option.text}</span>
                        </label>
                    )
                }
            )}
        </div>
    )
}
export default QuizItem;