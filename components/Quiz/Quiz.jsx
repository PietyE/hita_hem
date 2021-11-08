import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useRouter } from "next/router";
import Modal from '../ui/Modal';
import {setShowQuiz} from 'redux/actions/authPopupWindows';
import ButtonStyled from '../ui/Button';
import QuizItem from './components/QuizItem';
import {useTranslation} from "react-i18next";
import {getQuiz, getQuizErrorsSelector, getQuizIsPassedSelector} from "../../redux/reducers/user";
import {checkQuizAnswers, setQuizErrors} from "../../redux/actions/user";
import {getCompanyIdSelector} from "../../redux/reducers/companies";
import {recaptcha} from "../../utils/recaptcha";

const Quiz = ({show}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch()
    let history = useRouter();

    const quizData = useSelector(getQuiz)
    const quizErrors = useSelector(getQuizErrorsSelector)
    const quizIsPassed = useSelector(getQuizIsPassedSelector)
    const companyId = useSelector(getCompanyIdSelector);

    const [quizResults, setQuizResults] = useState({})

    const [warnings, setWarnings] = useState([])

    useEffect(() => {
        if (quizErrors) {
            setWarnings(quizErrors)
        }
    }, [quizErrors])

    useEffect(()=>{
        if(quizIsPassed && companyId){
            history.push( `/invest-form/[companyId]`, `/invest-form/${companyId}`);
            _setShowQuiz(false)
        }else if(quizIsPassed && !companyId){
            _setShowQuiz(false)

        }
    },[quizIsPassed,companyId])

    useEffect(()=>{
        return () => _setQuizErrors(null)

    },[])

    const _setShowQuiz = useCallback((data) => {
        dispatch(setShowQuiz(data));
    }, [dispatch]);

    const _checkQuizAnswers = useCallback((data) => {
        dispatch(checkQuizAnswers(data));
    }, [dispatch]);

    const _setQuizErrors = useCallback((data) => {
        dispatch(setQuizErrors(data));
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
        recaptcha('check_quiz_answers', _checkQuizAnswers,{answers: arrayOfAnswer})
        // _checkQuizAnswers({answers: arrayOfAnswer})
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
                                  disabled={Object.keys(quizResults).length !== quizData.length}
                                  onClick = {handleSubmit}>{t("quiz.button_confirm")}</ButtonStyled>
                </footer>
            </section>
        </Modal>
    );
}

export default Quiz;