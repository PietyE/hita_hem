import React, {useCallback, useEffect} from 'react';
import {useRouter} from 'next/router'
import {useDispatch, useSelector} from "react-redux";
import {makeRequestForCheckingToken} from "redux/actions/user";
import {getCanChangePasswordSelector, getIsFetchingAuthSelector, getIsSignInUserSelector} from "redux/reducers/user";
import SpinnerStyled from "../../components/ui/Spinner";
import {setShowSignIn} from "redux/actions/authPopupWindows";
import {CHANGE_PASSWORD} from "../../constants/routesConstant";


const changePasswordCheckKey = () => {
    const dispatch = useDispatch();
    const history = useRouter();
    const router = useRouter()
    const isFetching = useSelector(getIsFetchingAuthSelector)
    const canChangePassword = useSelector(getCanChangePasswordSelector)
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
            _makeRequestForCheckingToken({key:router?.query?.key , type:'password'})
        }
    }, [isAuth, _makeRequestForCheckingToken])

    useEffect(() => {
        if (canChangePassword) {
            history.push(CHANGE_PASSWORD)
        }
    }, [canChangePassword])
    return (
        <>
            {isFetching && <SpinnerStyled/>}
        </>
    );
}


export default changePasswordCheckKey;