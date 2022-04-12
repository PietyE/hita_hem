import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import Modal from '../ui/Modal';
import {useTranslation} from "react-i18next";
import {getQuizSelector, getQuizErrorsSelector} from "redux/reducers/user";
import ButtonStyled from "../ui/Button";
import QuizItem from "./components/QuizItem";
import UseQuizTabHook from "../../customHooks/useQuizTabHook";

const QuizPopup = ({show}) => {
    const {t} = useTranslation();
    const quizData = useSelector(getQuizSelector)
    const quizErrors = useSelector(getQuizErrorsSelector)

    const [quizQuestions, setQuizQuestions] = useState([])
    const [quizResults, setQuizResults] = useState([])
    const [warnings, setWarnings] = useState([])

    const {_setQuizErrors, _checkQuizAnswers, _setShowQuiz, _setShowDataLossWarning} = UseQuizTabHook()

    useEffect(() => {
        if (quizErrors) {
            setWarnings(quizErrors)
        }
    }, [quizErrors])

    useEffect(() => {
        const optional = []
        const mandatory = []
        quizData?.forEach((el) => el.optional ? optional.push(el) : mandatory.push(el))

        setQuizQuestions([...mandatory, ...optional])
    }, [quizData])

    useEffect(() => {
        return () => {
            _setQuizErrors(null)
            _setShowQuiz(false)
        }
    }, [])


    const receiveAnswer = (questionId, answerId) => {
        const newAnswersArray = [...quizResults]
        const questionIndex = quizResults.findIndex(el => el.question_id === Number(questionId))
        if (questionIndex === -1) {
            newAnswersArray.push({question_id: Number(questionId), pk: Number(answerId)})
        } else {
            newAnswersArray[questionIndex] = {question_id: Number(questionId), pk: Number(answerId)}
        }
        setQuizResults(newAnswersArray)
    }

    const handleCloseQuiz = () => {
        _setShowDataLossWarning(true)
    }

    const submitQuiz = () => {
        const answersForApi = quizResults?.map((el) => el.pk)
        _checkQuizAnswers(answersForApi)
    }


    return (
        <Modal
            show={show}
            onHide={handleCloseQuiz}
            backdrop={true}
            keyboard={false}
            centered={true}
            className='quiz_modal'
            dialogClassName='quiz_modal_dialog'
            bodyClassName='quiz_modal_body'
        >

            <section className='quiz'>
                <header className='quiz_header'>
                    <h2 className='quiz_header_title'>
                        {t("quiz.title")}
                    </h2>
                </header>
                <div className='quiz_body'>
                    {!!quizQuestions?.length &&
                    quizQuestions.map((question) =>

                        <QuizItem key={question.pk}
                                  data={question}
                                  onSelect={receiveAnswer}
                                  warningList={warnings}
                                  userQuizAnswers={quizResults}
                        />
                    )
                    }
                </div>
                <footer className='quiz_footer'>
                    <div className='quiz_footer_buttons_wrapper'>
                        <ButtonStyled colorStyle='outline-green'
                                      className='quiz_footer_button_back quiz_footer_button'
                                      onClick={handleCloseQuiz}>{t("quiz.back_button")}</ButtonStyled>
                        <ButtonStyled colorStyle='dark-green'
                                      className='quiz_footer_button_confirm quiz_footer_button'
                                      disabled={!quizResults.length}
                                      onClick={submitQuiz}>{t("quiz.button_confirm")}</ButtonStyled>

                    </div>

                </footer>
            </section>
        </Modal>
    );
}

export default QuizPopup;