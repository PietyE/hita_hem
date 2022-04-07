import React, {useEffect, useState} from 'react';
import {
    getAnswersSelector,
    getQuizErrorsSelector,
    getQuizIsPassedSelector,
    getQuizSelector
} from "../../redux/reducers/user";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import ButtonStyled from "../../components/ui/Button";
import isEqual from "lodash/isEqual";
import UseQuizTabHook from "../../customHooks/useQuizTabHook";
import QuizItem from "../../components/QuizPopup/components/QuizItem";


const QuizTab = ({wasChanges, setWasChanges}) => {
    const {t} = useTranslation();
    const quizData = useSelector(getQuizSelector)
    const quizAnswers = useSelector(getAnswersSelector)
    const isQuizPassed = useSelector(getQuizIsPassedSelector)
    const quizErrors = useSelector(getQuizErrorsSelector)

    const [mandatoryQuestions, setMandatoryQuestions] = useState([])
    const [optionalQuestions, setOptionalQuestions] = useState([])
    const [quizResults, setQuizResults] = useState([])
    const [warnings, setWarnings] = useState([])


    const {_getQuiz, _setQuizErrors, _checkQuizAnswers} = UseQuizTabHook()

    useEffect(() => {
        _getQuiz('from_profile')
        return () => {
            _setQuizErrors(null)
        }
    }, [])

    useEffect(() => {
        setQuizResults(quizAnswers)
    }, [quizAnswers])

    useEffect(() => {
        if (quizErrors) {
            setWarnings(quizErrors)
        }
    }, [quizErrors])


    useEffect(() => {
        const optional = []
        const mandatory = []
        quizData?.forEach((el) => el.optional ? optional.push(el) : mandatory.push(el))

        setOptionalQuestions(optional)
        setMandatoryQuestions(mandatory)
    }, [quizData])

    useEffect(() => {
        setWasChanges(!isEqual(quizResults, quizAnswers))
    }, [quizResults, quizAnswers])

    const handleBackButton = () => {
        setQuizResults(quizAnswers)
    }
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

    const submitQuiz = () => {
        const answersForApi = quizResults?.map((el) => el.pk)
        _checkQuizAnswers(answersForApi)
    }

    let _title = ''

    if (quizAnswers?.length === 0) {
        _title = t("quiz.title")
    } else if (quizData?.length > quizAnswers?.length) {
        _title = t("quiz.optional_title")
    } else if (quizData?.length === quizAnswers?.length) {
        _title = t("quiz.full_title")
    }
    const _containerStyle = isQuizPassed ? "quiz_column_reverse" : "quiz_column"

    return (
        <section className='quiz_tab'>
            <h2 className='quiz_tab_title'>
                {_title}
            </h2>
            <div className={`quiz_container ${_containerStyle}`}>
                {mandatoryQuestions?.length > 0 && (
                    <div className='mandatory_questions'>

                        <div className='quiz_body'>
                            {!!mandatoryQuestions?.length &&
                            mandatoryQuestions.map((question) =>

                                <QuizItem key={question.pk}
                                          data={question}
                                          onSelect={receiveAnswer}
                                          warningList={warnings}
                                          userQuizAnswers={quizResults}
                                />
                            )
                            }
                        </div>
                    </div>
                )}
                {/*{optionalQuestions?.length > 0 && (*/}
                <div className='optional_questions'>
                    <div className='quiz_body'>
                        {!!optionalQuestions?.length &&
                        optionalQuestions.map((question) =>

                            <QuizItem key={question.pk}
                                      data={question}
                                      onSelect={receiveAnswer}
                                      warningList={warnings}
                                      userQuizAnswers={quizResults}
                            />
                        )
                        }
                    </div>

                </div>
                {/*)}*/}

            </div>
            <footer className='quiz_footer'>
                <div className='quiz_footer_buttons_wrapper'>
                    <ButtonStyled colorStyle='outline-green'
                                  className='quiz_footer_button_back quiz_footer_button'
                                  disabled={!wasChanges}
                                  onClick={handleBackButton}>{t("quiz.tab_back_button")}</ButtonStyled>
                    <ButtonStyled colorStyle='dark-green'
                                  className='quiz_footer_button_confirm quiz_footer_button'
                                  disabled={!wasChanges}
                                  onClick={submitQuiz}>{t("quiz.button_confirm")}</ButtonStyled>

                </div>

            </footer>
        </section>
    );
}

export default QuizTab;