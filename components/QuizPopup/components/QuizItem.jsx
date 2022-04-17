import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import Image from "next/image";
import {getQuizIsPassedSelector} from "redux/reducers/user";
import WarningIcon from "public/images/attention.svg";

const QuizItem = ({data, onSelect, warningList, userQuizAnswers}) => {
    const {t} = useTranslation();
    const {pk, text, answers, optional} = data
    const [showWarning, setShowWarning] = useState(null)
    const [selectedAnswer, setSelectedAnswer] = useState('')
    const isQuizPassed = useSelector(getQuizIsPassedSelector)

    useEffect(() => {
        if (userQuizAnswers?.length > 0) {
            const currentQuestion = userQuizAnswers.find((answer) => answer?.question_id === pk)
            setSelectedAnswer(currentQuestion ? currentQuestion?.pk : '')
        }
    }, [userQuizAnswers, isQuizPassed])

    useEffect(() => {
        if (warningList.includes(pk.toString())) {
            setShowWarning(true)
        }
    }, [warningList])

    const saveAnswer = (e) => {
        const questionId = e?.target?.dataset?.question
        const answerId = e?.target?.dataset?.answer
        if (optional) {
            onSelect(questionId, answerId)
        } else {
            if (isQuizPassed) {
                return
            } else {
                onSelect(questionId, answerId)
            }
        }
        setShowWarning(false)
    }

    let _warningStyle = showWarning ? 'quiz_item_warning' : null

    return (
        <div className={`quiz_item ${_warningStyle}`}>

            {showWarning &&
            <div className='quiz_item_warning_notification'>
                <Image src={WarningIcon} alt='attention'/>
                <span>{t("quiz.error_text")}</span>
            </div>
            }
            <h3 className='quiz_item_title'>{optional ? text : text + '*'}</h3>

            {answers?.length &&
            answers.map(option => {
                    const _textWarning = showWarning && option.pk === Number(selectedAnswer) ? 'quiz_text_warning' : null
                    let _radioStyle = 'quiz_item_option_radio_check'

                    if (showWarning && option.pk === Number(selectedAnswer)) {
                        _radioStyle = 'quiz_item_option_radio_check_warning'
                    }

                    const _disabledStyle = {
                        border: isQuizPassed && !optional && selectedAnswer !== option.pk ? 'none' : ''
                    }
                    const _disabledCursor = {
                        cursor: isQuizPassed && !optional ? 'default' : ''
                    }

                    return (
                        <label key={option?.pk} className={`quiz_item_option_label ${_textWarning}` } style={_disabledCursor}>
                            <input type='radio'
                                   checked={selectedAnswer === option.pk}
                                   data-answer={option.pk}
                                   data-question={pk}
                                   onChange={saveAnswer}
                                   className='quiz_item_option_radio'/>
                            <div className={_radioStyle} style={_disabledStyle}>
                                <span className='quiz_item_option_radio_check_inner'/>
                            </div>
                            <span className='quiz_item_option_label_text'>{option.text}</span>
                        </label>
                    )
                }
            )}
        </div>
    )
}

export default QuizItem;