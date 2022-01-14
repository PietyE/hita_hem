import React, {useCallback, useEffect} from 'react';
import {useRouter} from "next/router";
import {signInWithBankId} from "redux/actions/user";
import {useDispatch} from "react-redux";
import {HOME_ROUTE} from "constants/routesConstant";
import SpinnerStyled from "../components/ui/Spinner";

function AuthBankId() {
    const dispatch = useDispatch();
    // const history = useRouter();
    const router = useRouter();
    const _signInWithBankId = useCallback(
        (data) => {
            dispatch(signInWithBankId(data));
        },
        [dispatch]
    );

    useEffect(()=>{
        const sessionId = router?.query?.grandidsession
        if(sessionId){
            _signInWithBankId(sessionId)
        }else{
            router.push(HOME_ROUTE)
        }
    },[])


    return (
        <>
            </>
    );
}

export default AuthBankId;