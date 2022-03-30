import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Quiz from "../Quiz";
import Modal from '../ui/Modal';
import {setShowDataLossWarning, setShowQuiz} from 'redux/actions/authPopupWindows';
import {useTranslation} from "react-i18next";
import {
    getQuizIsPassedSelector
} from "redux/reducers/user";
import {setQuizErrors} from "redux/actions/user";

const QuizPopup = ({show}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch()
    const quizIsPassed = useSelector(getQuizIsPassedSelector)

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

    const handleCloseQuiz = () => {
        _setShowDataLossWarning()
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
               <Quiz/>
            </section>
        </Modal>
    );
}

export default QuizPopup;