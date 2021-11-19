import React, {useCallback, useEffect} from 'react';
import {useRouter} from 'next/router'
import {useDispatch, useSelector} from "react-redux";
import {checkActivationToken} from "redux/actions/user";
import {CHANGE_EMAIL, HOME_ROUTE} from "constants/routesConstant";
import {getCanChangeEmailSelector, getIsFetchingAuthSelector, getIsSignInUserSelector} from "redux/reducers/user";
import SpinnerStyled from "../../components/ui/Spinner";
import {setShowSignIn} from "redux/actions/authPopupWindows";


const firstLoginCheckKey = () => {
    const dispatch = useDispatch();
    const history = useRouter();
    const router = useRouter()
    // const isFetching = useSelector(getIsFetchingAuthSelector)
    // const canChangeEmail = useSelector(getCanChangeEmailSelector)
    // const isAuth = useSelector(getIsSignInUserSelector);

    const _checkActivationToken = useCallback(
        (data) => {
            dispatch(checkActivationToken(data));
        },
        [dispatch]
    );

    // const _setShowSignIn = useCallback(
    //     (data) => {
    //         dispatch(setShowSignIn(data));
    //     },
    //     [dispatch]
    // );
    // useEffect(() => {
    //     _setShowSignIn(!isAuth)
    // }, [isAuth])

    useEffect(() => {
        // if (router?.query?.key ) {
            _checkActivationToken({key:router?.query?.key})
        history.push(HOME_ROUTE)
        // }
    }, [_checkActivationToken])

    // useEffect(() => {
    //     if (canChangeEmail) {
    //         history.push(CHANGE_EMAIL)
    //     }
    // }, [canChangeEmail])
    return (
        <>

            <SpinnerStyled/>
        </>
    );
}


export default firstLoginCheckKey;