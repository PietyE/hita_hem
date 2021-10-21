import React, {useCallback, useEffect} from 'react';
import {useRouter} from 'next/router'
import {useDispatch, useSelector} from "react-redux";
import {makeRequestForCheckingToken} from "redux/actions/user";
import {CHANGE_EMAIL} from "constants/routesConstant";
import {getCanChangeEmailSelector, getIsFetchingAuthSelector, getIsSignInUserSelector} from "redux/reducers/user";
import SpinnerStyled from "../../components/ui/Spinner";
import {setShowSignIn} from "redux/actions/authPopupWindows";


const changeEmailCheckKey = () => {
    const dispatch = useDispatch();
    const history = useRouter();
    const router = useRouter()
    const isFetching = useSelector(getIsFetchingAuthSelector)
    const canChangeEmail = useSelector(getCanChangeEmailSelector)
    const isAuth = useSelector(getIsSignInUserSelector);

    const _makeRequestForCheckingToken = useCallback(
        (data) => {
            dispatch(makeRequestForCheckingToken(data));
        },
        [dispatch]
    );

    const _setShowSignIn = useCallback(
        (data) => {
            dispatch(setShowSignIn(data));
        },
        [dispatch]
    );
    useEffect(() => {
        _setShowSignIn(!isAuth)
    }, [isAuth])

    useEffect(() => {
        if (router?.query?.key && isAuth) {
            _makeRequestForCheckingToken({key:router?.query?.key , type:'email'})
        }
    }, [isAuth, _makeRequestForCheckingToken])

    useEffect(() => {
        if (canChangeEmail) {
            history.push(CHANGE_EMAIL)
        }
    }, [canChangeEmail])
    return (
        <>
            {isFetching && <SpinnerStyled/>}
        </>
    );
}


export default changeEmailCheckKey;