import React, {useCallback, useEffect} from 'react';
import Quiz from "../../components/Quiz";
import {getQuiz, setQuizErrors} from "../../redux/actions/user";
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";

const QuizTab = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch()

    const _getQuiz = useCallback((data) => {
        dispatch(getQuiz(data));
    }, [dispatch]);

    const _setQuizErrors = useCallback((data) => {
        dispatch(setQuizErrors(data));
    }, [dispatch]);

    useEffect(()=>{
        _getQuiz('from_profile')
        return () => {
            _setQuizErrors(null)
        }
    },[])

    return (
<section className='quiz_tab'>
    <h2 className='quiz_tab_title'>
        To start the investment process, please answer the following questions.
    </h2>
    <div className='quiz_container'>
        <div className='mandatory_questions'>
            <Quiz/>
        </div>
        <div className='optional_questions'>
            <Quiz/>

        </div>
    </div>

        </section>
    );
}

export default QuizTab;