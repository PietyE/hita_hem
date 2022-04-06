import React, {useCallback, useEffect, useState} from 'react';
import QuizItem from "../QuizPopup/components/QuizItem";
import {useDispatch, useSelector} from "react-redux";
import {getQuizErrorsSelector} from "../../redux/reducers/user";
import { setQuizErrors} from "../../redux/actions/user";

const Quiz = ({quizData,receiveAnswer, quizAnswers}) => {
    const dispatch = useDispatch()

    const quizErrors = useSelector(getQuizErrorsSelector)

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

    return (
        <div className = 'quiz_body'>
            {!!quizData?.length &&
            quizData.map((question, i) =>

                <QuizItem key = {question.pk}
                          index = {i}
                          data = {question}
                          onSelect = {receiveAnswer}
                          warningList = {warnings}
                          userQuizAnswers={quizAnswers}
                />
            )
            }
        </div>
    );
}

export default Quiz;