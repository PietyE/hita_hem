import React, {useCallback, useEffect} from 'react';
import {useRouter} from 'next/router'
import {useDispatch} from "react-redux";
import {checkActivationToken} from "redux/actions/user";
import {HOME_ROUTE} from "constants/routesConstant";
import SpinnerStyled from "../../components/ui/Spinner";

const firstLoginCheckKey = () => {
    const dispatch = useDispatch();
    const history = useRouter();
    const router = useRouter()
    const _checkActivationToken = useCallback(
        (data) => {
            dispatch(checkActivationToken(data));
        },
        [dispatch]
    );


    useEffect(() => {
            _checkActivationToken({key:router?.query?.key})
        history.push(HOME_ROUTE)
    }, [_checkActivationToken])
    return (
        <>
            <SpinnerStyled/>
        </>
    );
}


export default firstLoginCheckKey;