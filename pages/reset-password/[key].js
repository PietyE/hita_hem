import React, {useCallback, useEffect} from 'react';
import {useRouter} from 'next/router'
import {useDispatch, useSelector} from "react-redux";
import {makeRequestForResetPasswordTokenVerification} from "redux/actions/user";
import {getCanResetPasswordSelector, getIsFetchingAuthSelector} from "redux/reducers/user";
import SpinnerStyled from "../../components/ui/Spinner";
import {RESET_PASSWORD} from "../../constants/routesConstant";


const changePasswordCheckKey = () => {
    const dispatch = useDispatch();
    const history = useRouter();
    const router = useRouter()
    const isFetching = useSelector(getIsFetchingAuthSelector)
    const canResetPassword = useSelector(getCanResetPasswordSelector)

    const _makeRequestForResetPasswordTokenVerification = useCallback(
        (data) => {
            dispatch(makeRequestForResetPasswordTokenVerification(data));
        },
        [dispatch]
    );

    useEffect(() => {
        if (router?.query?.key) {
            _makeRequestForResetPasswordTokenVerification({key:router?.query?.key})
        }
    }, [_makeRequestForResetPasswordTokenVerification])

    useEffect(() => {
        if (canResetPassword) {
            history.push(RESET_PASSWORD)
        }
    }, [canResetPassword])
    return (
        <>
            {isFetching && <SpinnerStyled/>}
        </>
    );
}


export default changePasswordCheckKey;