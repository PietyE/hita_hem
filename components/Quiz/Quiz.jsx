import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Modal from '../ui/Modal';
import {setShowQuiz, setShowQuizError} from 'redux/actions/authPopupWindows';
import ButtonStyled from '../ui/Button';
import QuizItem from './components/QuizItem';
import {useTranslation} from "react-i18next";
import {getQuiz, getQuizErrorsSelector} from "../../redux/reducers/user";
import {checkQuizAnswers} from "../../redux/actions/user";

const Quiz = ({show}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch()

    const quizData = useSelector(getQuiz)
    const quizErrors = useSelector(getQuizErrorsSelector)

    const generateInitialValues = () => {
        if(quizData?.length){
            const object ={}
            for (let i = 0; i < quizData.length; ++ i) {
                object[`answer${i+1}`] = 999
            }
            return object
        }
        return {}
    }

    const [quizResults, setQuizResults] = useState(generateInitialValues())
    const [warnings, setWarnings] = useState({})

    useEffect(() => {
        if (quizErrors) {
            setWarnings(quizErrors)
        }
    }, [quizErrors])
    const _setShowQuiz = useCallback((data) => {
        dispatch(setShowQuiz(data));
    }, [dispatch]);

    const _checkQuizAnswers = useCallback((data) => {
        dispatch(checkQuizAnswers(data));
    }, [dispatch]);

    const handleCloseQuiz = () => {
        _setShowQuiz(false)
    }

    const receiveAnswer = (data, answerNumber) => {
        setQuizResults({...quizResults, [answerNumber]: data})
    }
    const handleSubmit = () => {
        const arrayOfAnswer = []

        for (let answer in quizResults) {
            arrayOfAnswer.push(quizResults[answer])
        }
        _checkQuizAnswers({answers: arrayOfAnswer})
    }
    return (
        <Modal
            show = {show}
            onHide = {handleCloseQuiz}
            backdrop = {true}
            keyboard = {false}
            centered = {true}
            className = 'quiz_modal'
            dialogClassName = 'quiz_modal_dialog'
            bodyClassName = 'quiz_modal_body'
        >

            <section className = 'quiz'>
                <header className = 'quiz_header'>
                    <h2 className = 'quiz_header_title'>
                        {t("quiz.title")}
                    </h2>
                    <p className = 'quiz_header_text'>{t("quiz.text")}</p>
                </header>
                <div className = 'quiz_body'>
                    {!!quizData?.length &&
                    quizData.map((question, i) =>

                        <QuizItem key = {i}
                                  index = {i}
                                  data = {question}
                                  onSelect = {receiveAnswer}
                                  warningList = {warnings}
                        />
                    )
                    }
                </div>
                <footer className = 'quiz_footer'>
                    <ButtonStyled colorStyle = 'outline-green' className = 'quiz_footer_button_back quiz_footer_button'
                                  onClick = {handleCloseQuiz}>{t("quiz.back_button")}</ButtonStyled>
                    <ButtonStyled colorStyle = 'dark-green' className = 'quiz_footer_button_confirm quiz_footer_button'
                                  onClick = {handleSubmit}>{t("quiz.button_confirm")}</ButtonStyled>
                </footer>
            </section>
        </Modal>
    );
}

export default Quiz;