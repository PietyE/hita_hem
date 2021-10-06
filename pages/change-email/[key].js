import React, {useCallback, useEffect, useState} from 'react';
import { useRouter } from 'next/router'
import {useDispatch, useSelector} from "react-redux";
import {getCanChangeEmailSelector, getIsSignInUserSelector} from "redux/reducers/user";
import {setCanChangeEmail} from "redux/actions/user";
import {setShowSignIn} from "redux/actions/authPopupWindows";
import {getShowSignIn} from "redux/reducers/authPopupWindows";
import {CHANGE_EMAIL} from "constants/routesConstant";


const changeEmailCheckKey = () => {
    const dispatch = useDispatch();
    const history = useRouter();
    const router = useRouter()
    const isAuth = useSelector(getIsSignInUserSelector);
    const isShowSignIn = useSelector(getShowSignIn);
    const canChangeEmail = useSelector(getCanChangeEmailSelector)
    const key = router?.query?.key
    console.log('isAuth', isAuth)
    const [showStub, setShowStub] = useState(false)

    const _setCanChangeEmail = useCallback((data) => {
        dispatch(setCanChangeEmail(data));
    }, [dispatch]);

    const _setShowSignIn = useCallback((data) => {
        dispatch(setShowSignIn(data));
    }, [dispatch]);

    useEffect(()=>{
        if(!isAuth){
            _setShowSignIn(true)
        }
    },[_setShowSignIn, isAuth])

    useEffect(()=>{
        if(key){
            //todo connect to api for checking key
            _setCanChangeEmail(true)
        }
    },[key, _setCanChangeEmail])

    useEffect(()=>{
        if(isAuth && canChangeEmail){
            history.push(CHANGE_EMAIL);
        }
        if(!isShowSignIn && !isAuth && !canChangeEmail){
            setShowStub(true)
        }
    },[isAuth, canChangeEmail, isShowSignIn])

    return(
    <div>
        {showStub && (
            <>
            <h1>Something went wrong!</h1>
            </>
        )}
    </div>
)
;
}

export default changeEmailCheckKey;