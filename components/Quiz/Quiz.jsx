import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Modal from '../ui/Modal';
import {setShowDataLossWarning, setShowQuiz} from 'redux/actions/authPopupWindows';
import ButtonStyled from '../ui/Button';
import QuizItem from './components/QuizItem';
import {useTranslation} from "react-i18next";
import {
    getIsShowQuizForBankId,
    getQuiz,
    getQuizErrorsSelector,
    getQuizIsPassedSelector
} from "../../redux/reducers/user";
import {checkQuizAnswers, setQuizErrors, signUp} from "../../redux/actions/user";
// import {getCompanyIdSelector} from "../../redux/reducers/companies";
import {recaptcha} from "../../utils/recaptcha";
import CaptchaPrivacyBlock from "../CaptchaPrivacyBlock";

const Quiz = ({show, data}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch()
    // let history = useRouter();

    const quizData = useSelector(getQuiz)
    const quizErrors = useSelector(getQuizErrorsSelector)
    const quizIsPassed = useSelector(getQuizIsPassedSelector)
    // const companyId = useSelector(getCompanyIdSelector);
    const isShowQuizForBankId = useSelector(getIsShowQuizForBankId)

    const [quizResults, setQuizResults] = useState({})

    const [warnings, setWarnings] = useState([])

    useEffect(() => {
        if (quizErrors) {
            setWarnings(quizErrors)
        }
    }, [quizErrors])

    useEffect(() => {
        if (quizIsPassed) {
            _setShowQuiz(false)
        }
    }, [quizIsPassed])

    useEffect(() => {
        return () => _setQuizErrors(null)

    }, [])

    const _setShowQuiz = useCallback((data) => {
        dispatch(setShowQuiz(data));
    }, [dispatch]);

    const _setShowDataLossWarning = useCallback(() => {
        dispatch(setShowDataLossWarning(true));
    }, [dispatch]);

    const _checkQuizAnswers = useCallback((data) => {
        dispatch(checkQuizAnswers(data));
    }, [dispatch]);

    const _setQuizErrors = useCallback((data) => {
        dispatch(setQuizErrors(data));
    }, [dispatch]);

    const _signUp = useCallback((data) => {
        dispatch(signUp(data));
    }, [dispatch]);

    const handleCloseQuiz = () => {
        _setShowDataLossWarning()
    }

    const receiveAnswer = (data, answerNumber) => {
        setQuizResults({...quizResults, [answerNumber]: data})
    }
    const handleSubmit = () => {
        const arrayOfAnswer = []

        for (let answer in quizResults) {
            arrayOfAnswer.push(quizResults[answer])
        }

        if(isShowQuizForBankId){
            recaptcha('check_quiz_answers_for_bank_id',
                _checkQuizAnswers,
                {
                    bearer: isShowQuizForBankId,
                    answers: arrayOfAnswer,
                })

        }else{
            recaptcha('check_quiz_answers',
                _signUp,
                {
                    answers: arrayOfAnswer,
                    email: `${data.email.toLowerCase()}`,
                    is_agree: `${data.is_agree}`,
                    password: `${data.password}`,
                    confirm_password: `${data.confirm_password}`
                })
        }
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
                    {/*<p className = 'quiz_header_text'>{t("quiz.text")}</p>*/}
                </header>
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
                    <CaptchaPrivacyBlock/>
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
            </section>
        </Modal>
    );
}

export default Quiz;