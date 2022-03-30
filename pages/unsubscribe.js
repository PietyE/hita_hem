import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getIsSignInUserSelector, getUserIdSelector} from "../redux/reducers/user";
import SpinnerStyled from "../components/ui/Spinner";
import {useRouter} from "next/router";
import {setShowSignIn} from "../redux/actions/authPopupWindows";
import {setActiveTab} from "../redux/actions/user";


const Unsubscribe = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const isAuth = useSelector(getIsSignInUserSelector)
    const userId = useSelector(getUserIdSelector);

    const _setShowSignIn = useCallback(
        (data) => {
            dispatch(setShowSignIn(data));
        },
        [dispatch]
    );

    const _setActiveTab = useCallback(
        (data) => {
            dispatch(setActiveTab(data));
        },
        [dispatch]
    );

    useEffect(() => {
        _setShowSignIn(!isAuth)
    }, [isAuth])

    useEffect(()=>{
        if(isAuth && userId){
            _setActiveTab('account_settings')
            router.push(`/users/${userId}/profile`);
        }
    },[userId,isAuth])

    return (
        <SpinnerStyled/>
    );
}

export default Unsubscribe;