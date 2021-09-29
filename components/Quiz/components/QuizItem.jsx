import React, {useEffect, useState} from 'react';
import Image from "next/image";
import WarningIcon from 'public/images/attention.svg';

const QuizItem = ({data, onSelect, warningList}) => {
    const{id, question, options, answer } = data
    const [showWarning, setShowWarning] = useState(null)
    const [selectedAnswer, setSelectedAnswer] = useState(null)

    useEffect(()=>{
        if(warningList[`answer${id}`] !== showWarning){
            setShowWarning(warningList[`answer${id}`])
        }
    },[warningList])


    let _warningStyle = showWarning?'quiz_item_warning': null
    const checkAnswer = (e) => {
        const booleanIsCorrect = e.target.value === answer
        onSelect(booleanIsCorrect, `answer${data.id}`)
        setShowWarning(false)
        setSelectedAnswer(e.target.value)
    }
    return(
        <div className= {`quiz_item ${_warningStyle}`}>
            {showWarning &&
            <div className = 'quiz_item_warning_notification'>
                <Image src={WarningIcon} alt='attention'/>
                <span>You have to select right answer</span>
            </div>
            }
            <h3 className= 'quiz_item_title' >{question}</h3>
            {options.length &&
            options.map((option, i) => {
                    const _textWarning = showWarning && option === selectedAnswer?'quiz_text_warning':null
                    const _radioWarning = showWarning && option === selectedAnswer?'quiz_item_option_radio_check_warning':'quiz_item_option_radio_check'
                    return  (
                        <label key = {i} className = {`quiz_item_option_label ${_textWarning}`}>
                            <input type = 'radio' value = {option} name = {id} onChange = {checkAnswer}
                                   className = 'quiz_item_option_radio'/>
                            <div className = {_radioWarning}>
                                <span className = 'quiz_item_option_radio_check_inner'/>
                            </div>
                            <span className='quiz_item_option_label_text'>{option}</span>
                        </label>
                    )
                }
            )}
        </div>
    )
}
export default QuizItem;