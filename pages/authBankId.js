import React, {useCallback, useEffect} from 'react';
import {useRouter} from "next/router";
import {changeAccountType, signInWithBankId} from "redux/actions/user";
import {useDispatch} from "react-redux";
import {HOME_ROUTE} from "constants/routesConstant";
import SpinnerStyled from "../components/ui/Spinner";
import {recaptcha} from "../utils/recaptcha";

function AuthBankId() {
    const dispatch = useDispatch();
    const router = useRouter();

    const _signInWithBankId = useCallback(
        (data) => {
            dispatch(signInWithBankId(data));
        },
        [dispatch]
    );

    const _changeAccountType = useCallback(
        (data) => {
            dispatch(changeAccountType(data));
        },
        [dispatch]
    );

    useEffect(()=>{
        const sessionId = router?.query?.grandidsession
        const accountType = router?.query?.account_type
        if(sessionId){
            if(accountType === 'bankId'){
                recaptcha('chnage_account_type', _changeAccountType, {token:sessionId, provider: 'bank_id', action:router})
                // _changeAccountType({token:sessionId, provider: 'bankid'})
            }else{
                _signInWithBankId({data:sessionId, action:router})
            }
        }else{
            router.push(HOME_ROUTE)
        }
    },[])


    return (
        <>
            <SpinnerStyled/>
            </>
    );
}

export default AuthBankId;