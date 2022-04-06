import {useCallback} from "react";
import {checkQuizAnswers, getQuiz, setQuizErrors} from "../redux/actions/user";
import {useDispatch} from "react-redux";

const UseQuizTabHook = () => {
    const dispatch = useDispatch()

    const _getQuiz = useCallback((data) => {
        dispatch(getQuiz(data));
    }, [dispatch]);

    const _setQuizErrors = useCallback((data) => {
        dispatch(setQuizErrors(data));
    }, [dispatch]);

    const _checkQuizAnswers = useCallback((data) => {
        dispatch(checkQuizAnswers(data));
    }, [dispatch]);

    return {
        _getQuiz,
        _setQuizErrors,
        _checkQuizAnswers,
    }
}

export default UseQuizTabHook;