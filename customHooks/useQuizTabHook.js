import {useCallback} from "react";
import {checkQuizAnswers, getQuiz, setQuizErrors} from "../redux/actions/user";
import {useDispatch} from "react-redux";
import {setShowDataLossWarning, setShowQuiz} from "../redux/actions/authPopupWindows";

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

    const _setShowQuiz = useCallback((data) => {
        dispatch(setShowQuiz(data));
    }, [dispatch]);

    const _setShowDataLossWarning = useCallback((data) => {
        dispatch(setShowDataLossWarning(data));
    }, [dispatch]);
    return {
        _getQuiz,
        _setQuizErrors,
        _checkQuizAnswers,
        _setShowQuiz,
        _setShowDataLossWarning,
    }
}

export default UseQuizTabHook;