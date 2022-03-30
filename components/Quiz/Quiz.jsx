import React, {useCallback, useEffect, useState} from 'react';
import QuizItem from "../QuizPopup/components/QuizItem";
import ButtonStyled from "../ui/Button";
import {useDispatch, useSelector} from "react-redux";
import {getQuiz, getQuizErrorsSelector} from "../../redux/reducers/user";
import {checkQuizAnswers, setQuizErrors} from "../../redux/actions/user";
import {setShowDataLossWarning} from "../../redux/actions/authPopupWindows";
import {useTranslation} from "react-i18next";

const Quiz = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch()

    const quizData = useSelector(getQuiz)
    const quizErrors = useSelector(getQuizErrorsSelector)

    const [quizResults, setQuizResults] = useState({})
    const [warnings, setWarnings] = useState([])

    useEffect(() => {
        if (quizErrors) {
            setWarnings(quizErrors)
        }
    }, [quizErrors])

    useEffect(()=>{
        return ()=>{
            _setQuizErrors(null)
        }
    },[])

    const _setQuizErrors = useCallback((data) => {
        dispatch(setQuizErrors(data));
    }, [dispatch]);

    const _checkQuizAnswers = useCallback((data) => {
        dispatch(checkQuizAnswers(data));
    }, [dispatch]);

    const _setShowDataLossWarning = useCallback(() => {
        dispatch(setShowDataLossWarning(true));
    }, [dispatch]);

    const handleCloseQuiz = () => {
        _setShowDataLossWarning()
    }

    const receiveAnswer = (data, answerNumber) => {
        setQuizResults({...quizResults, [answerNumber]: Number(data)})
    }
    const handleSubmit = () => {
        const arrayOfAnswer = []

        for (let answer in quizResults) {
            arrayOfAnswer.push(quizResults[answer])
        }

        _checkQuizAnswers(arrayOfAnswer)

    }
    return (
        <>
        <div className = 'quiz_body'>
            {!!quizData?.length &&
            quizData.map((question, i) =>

                <QuizItem key = {question.pk}
                          index = {i}
                          data = {question}
                          onSelect = {receiveAnswer}
                          warningList = {warnings}
                />
            )
            }
        </div>
    <footer className = 'quiz_footer'>
        <div className='quiz_footer_buttons_wrapper'>
            <ButtonStyled colorStyle = 'outline-green'
                          className = 'quiz_footer_button_back quiz_footer_button'
                          onClick = {handleCloseQuiz}>{t("quiz.back_button")}</ButtonStyled>
            <ButtonStyled colorStyle = 'dark-green'
                          className = 'quiz_footer_button_confirm quiz_footer_button'
                          disabled = {Object.keys(quizResults).length !== quizData.length}
                          onClick = {handleSubmit}>{t("quiz.button_confirm")}</ButtonStyled>

        </div>

    </footer>
            </>

    );
}

export default Quiz;