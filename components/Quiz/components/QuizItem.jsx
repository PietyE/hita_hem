import React, {useEffect, useState} from 'react';
import Image from "next/image";
import WarningIcon from 'public/images/attention.svg';
import {useTranslation} from "react-i18next";

const QuizItem = ({data, index, onSelect, warningList}) => {
    const {t} = useTranslation();
    const {pk, text, answers} = data
    const [showWarning, setShowWarning] = useState(null)
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    useEffect(() => {
        if (warningList.includes(pk.toString())) {
            setShowWarning(true)
        }
    }, [warningList])

    let _warningStyle = showWarning ? 'quiz_item_warning' : null

    const saveAnswer = (e) => {
        onSelect(e.target.dataset.id, `answer${index + 1}`)
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
            <h3 className = 'quiz_item_title'>{text}</h3>
            {answers?.length &&
            answers.map(option => {
                    const _textWarning = showWarning && option.text === selectedAnswer ? 'quiz_text_warning' : null
                    const _radioWarning = showWarning && option.text === selectedAnswer ? 'quiz_item_option_radio_check_warning' : 'quiz_item_option_radio_check'
                    return (
                        <label key = {option?.pk} className = {`quiz_item_option_label ${_textWarning}`}>
                            <input type = 'radio' value = {option.text} name = {pk} data-id = {option.pk}
                                   onChange = {saveAnswer}
                                   className = 'quiz_item_option_radio'/>
                            <div className = {_radioWarning}>
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