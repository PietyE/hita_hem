import React, {useCallback, useEffect, useState} from 'react';
import Quiz from "../../components/Quiz";
import {checkQuizAnswers, getQuiz, setQuizErrors} from "../../redux/actions/user";
import {getAnswersSelector, getQuizIsPassedSelector, getQuizSelector} from "../../redux/reducers/user";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import ButtonStyled from "../../components/ui/Button";
import isEqual from "lodash/isEqual";

export  const convertAnswers = (data, isQuizPassed) => {
    let arrayOfAnswer = []
    if (isQuizPassed && Array.isArray(data)) {
        arrayOfAnswer = data?.map((el) => el.pk)
    } else {
        for (let answer in data) {
            arrayOfAnswer.push(data[answer])
        }
    }
    return arrayOfAnswer
}


const QuizTab = ({wasChanges,setWasChanges}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch()
    const quizData = useSelector(getQuizSelector)
    const quizAnswers = useSelector(getAnswersSelector)
    const isQuizPassed = useSelector(getQuizIsPassedSelector)

    const [mandatoryQuestions, setMandatoryQuestions] = useState([])
    const [optionalQuestions, setOptionalQuestions] = useState([])
    const [quizResults, setQuizResults] = useState(null)
    // const [wasChanges, setWasChanges] = useState(false)

    useEffect(() => {
        _getQuiz('from_profile')
        return () => {
            _setQuizErrors(null)
        }
    }, [])

    useEffect(() => {
        const optional = []
        const mandatory = []
        quizData?.forEach((el) => el.optional ? optional.push(el) : mandatory.push(el))

        setOptionalQuestions(optional)
        setMandatoryQuestions(mandatory)
    }, [quizData])


    useEffect(() => {
        setQuizResults(quizAnswers)
    }, [])

    useEffect(()=>{
        const answersNew = convertAnswers(quizResults, isQuizPassed)
        const answersFromApi = quizAnswers?.map((el) => el.pk)
        setWasChanges(!isEqual(answersFromApi, answersNew))
    },[isQuizPassed,quizResults,quizAnswers])

    const _getQuiz = useCallback((data) => {
        dispatch(getQuiz(data));
    }, [dispatch]);

    const _setQuizErrors = useCallback((data) => {
        dispatch(setQuizErrors(data));
    }, [dispatch]);

    const _checkQuizAnswers = useCallback((data) => {
        dispatch(checkQuizAnswers(data));
    }, [dispatch]);

    const handleBackButton = () => {
        // const optional = []
        // const mandatory = []
        // quizData?.forEach((el)=>el.optional ? optional.push(el) : mandatory.push(el))
        //
        // setOptionalQuestions(optional)
        // setMandatoryQuestions(mandatory)
    }
    const receiveAnswer = (data, answerNumber) => {
        if (isQuizPassed) {
            if (!Array.isArray(quizResults)) {
                const answer = {question_id: Number(answerNumber), pk: Number(data)}
                const questionIndex = quizAnswers.findIndex((el) => el.question_id === Number(answerNumber))
                const newArray = [...quizAnswers]
                if (questionIndex === -1) {
                    newArray.push(answer)
                } else {
                    newArray[questionIndex] = answer
                }
                setQuizResults(newArray)
            } else {
                const answer = {question_id: Number(answerNumber), pk: Number(data)}
                const questionIndex = quizResults.findIndex((el) => el.question_id === Number(answerNumber))
                const newArray = [...quizResults]
                if (questionIndex === -1) {
                    newArray.push(answer)
                } else {
                    newArray[questionIndex] = answer
                }
                setQuizResults(newArray)
            }


        } else {
            setQuizResults({...quizResults, [answerNumber]: Number(data)})
        }
    }


    const submitQuiz = () => {
       const convertedAnswers = convertAnswers(quizResults, isQuizPassed)
            _checkQuizAnswers(convertedAnswers)
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
                        <Quiz quizData={mandatoryQuestions} receiveAnswer={receiveAnswer} quizAnswers={quizAnswers}/>
                    </div>
                )}
                {/*{optionalQuestions?.length > 0 && (*/}
                <div className='optional_questions'>
                    <Quiz quizData={optionalQuestions} receiveAnswer={receiveAnswer} quizAnswers={quizAnswers}/>

                </div>
                {/*)}*/}

            </div>
            <footer className='quiz_footer'>
                <div className='quiz_footer_buttons_wrapper'>
                    <ButtonStyled colorStyle='outline-green'
                                  className='quiz_footer_button_back quiz_footer_button'
                                  disabled = {!wasChanges}
                                  onClick={handleBackButton}>{t("quiz.back_button")}</ButtonStyled>
                    <ButtonStyled colorStyle='dark-green'
                                  className='quiz_footer_button_confirm quiz_footer_button'
                        disabled = {!wasChanges}
                                  onClick={submitQuiz}>{t("quiz.button_confirm")}</ButtonStyled>

                </div>

            </footer>
        </section>
    );
}

export default QuizTab;