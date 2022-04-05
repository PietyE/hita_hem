import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Quiz from "../Quiz";
import Modal from '../ui/Modal';
import {setShowDataLossWarning, setShowQuiz} from 'redux/actions/authPopupWindows';
import {useTranslation} from "react-i18next";
import {
    getQuizSelector,
    getQuizIsPassedSelector
} from "redux/reducers/user";
import {setQuizErrors} from "redux/actions/user";
import ButtonStyled from "../ui/Button";
import {checkQuizAnswers} from "../../redux/actions/user";

const QuizPopup = ({show}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch()
    const quizIsPassed = useSelector(getQuizIsPassedSelector)
    const quizDataFromApi = useSelector(getQuizSelector)

    // quizData.forEach((el)=>el.optional ? optionalQuestions.push(el) : mandatoryQuestions.push(el))


    //  Check with optional
    const [quizData, setQuizData] = useState([])
    useEffect(()=>{
        const optional = []
        const mandatory = []
        quizDataFromApi?.forEach((el)=>el.optional ? optional.push(el) : mandatory.push(el))

        setQuizData([...mandatory,...optional])
    },[quizDataFromApi])

    // useEffect(()=>{
    //     const sorted = quizDataFromApi.sort((a,_)=> a?.optional ? -1 : 1)
    //     setSortedQuiz(sorted)
    // },[])

    const [quizResults, setQuizResults] = useState({})


    useEffect(() => {
        if (quizIsPassed) {
            _setShowQuiz(false)
        }
    }, [quizIsPassed])

    useEffect(() => {
        return () => {
            _setQuizErrors(null)
            _setShowQuiz(false)
        }

    }, [])

    const _setShowQuiz = useCallback((data) => {
        dispatch(setShowQuiz(data));
    }, [dispatch]);

    const _setShowDataLossWarning = useCallback(() => {
        dispatch(setShowDataLossWarning(true));
    }, [dispatch]);

    const _setQuizErrors = useCallback((data) => {
        dispatch(setQuizErrors(data));
    }, [dispatch]);

    const _checkQuizAnswers = useCallback((data) => {
        dispatch(checkQuizAnswers(data));
    }, [dispatch]);

    const receiveAnswer = (data, answerNumber) => {

        setQuizResults({...quizResults, [answerNumber]: Number(data)})
    }

    const handleCloseQuiz = () => {
        _setShowDataLossWarning()
    }

    const submitQuiz = () => {
        const arrayOfAnswer = []

        for (let answer in quizResults) {
            arrayOfAnswer.push(quizResults[answer])
        }
        _checkQuizAnswers(arrayOfAnswer)
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
                </header>
               <Quiz quizData={quizData} receiveAnswer={receiveAnswer}/>
                <footer className = 'quiz_footer'>
                    <div className='quiz_footer_buttons_wrapper'>
                        <ButtonStyled colorStyle = 'outline-green'
                                      className = 'quiz_footer_button_back quiz_footer_button'
                                      onClick = {handleCloseQuiz}>{t("quiz.back_button")}</ButtonStyled>
                        <ButtonStyled colorStyle = 'dark-green'
                                      className = 'quiz_footer_button_confirm quiz_footer_button'
                                      disabled = {Object.keys(quizResults).length !== quizDataFromApi?.length}
                                      onClick = {submitQuiz}>{t("quiz.button_confirm")}</ButtonStyled>

                    </div>

                </footer>
            </section>
        </Modal>
    );
}

export default QuizPopup;