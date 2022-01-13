import React, {useCallback} from 'react';
import {useRouter} from "next/router";
import {signInWithBankId} from "redux/actions/user";
import {useDispatch} from "react-redux";

function AuthBankId() {
    const dispatch = useDispatch();

    const router = useRouter()

    const _signInWithBankId = useCallback(
        (data) => {
            dispatch(signInWithBankId(data));
        },
        [dispatch]
    );

    const sessionId = router?.query?.grandidsession
    if(sessionId){
        _signInWithBankId(sessionId)
    }
    return (
        <div></div>
    );
}

export default AuthBankId;