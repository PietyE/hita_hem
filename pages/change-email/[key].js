import React, {useCallback, useEffect} from 'react';
import {useRouter} from 'next/router'
import {useDispatch, useSelector} from "react-redux";
import {setCanChangeEmail} from "redux/actions/user";
import {getShowSignIn} from "redux/reducers/authPopupWindows";
import {CHANGE_EMAIL} from "constants/routesConstant";
import {getIsSignInUserSelector} from "../../redux/reducers/user";
import {setShowSignIn} from "../../redux/actions/authPopupWindows";


const changeEmailCheckKey = () => {
    const dispatch = useDispatch();
    const history = useRouter();
    const router = useRouter()
    const isShowSignIn = useSelector(getShowSignIn);
    const key = router?.query?.key

    const isAuth = useSelector(getIsSignInUserSelector);

    const _setShowSignIn = useCallback(
        (data) => {
            dispatch(setShowSignIn(data));
        },
        [dispatch]
    );

    const _setCanChangeEmail = useCallback((data) => {
        dispatch(setCanChangeEmail(data));
        // if(!isAuth ){
        //     _setShowSignIn(true)
        // }
    }, [dispatch, isAuth, _setShowSignIn]);


    useEffect(() => {
        //todo connect to api for checking key, and check is auth in saga
        _setCanChangeEmail(true)
        history.push(CHANGE_EMAIL);
    }, [key, isShowSignIn])

    return (
        <>
        </>
    )
        ;
}

export default changeEmailCheckKey;