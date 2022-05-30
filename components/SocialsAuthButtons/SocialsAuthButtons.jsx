import React, {useCallback} from 'react';
import {GoogleLogin} from "react-google-login";
import {useDispatch, useSelector} from "react-redux";
import {getAuthSocialAccountErrorSelector} from "../../redux/reducers/errors";
import useAuthErrorHandler from "../../customHooks/useAuthErrorHandler";
import {
    changeAccountType,
    makeRequestForSignInWithBankId,
    setChangeableAccountType,
    signInWithGoogle
} from "../../redux/actions/user";
import {recaptcha} from "../../utils/recaptcha";

const SocialsAuthButtons = ({containerClassName, type}) => {
    const errorHandlerHook = useAuthErrorHandler()
    const dispatch = useDispatch();

    const socialAccountError = useSelector(getAuthSocialAccountErrorSelector)


    const responseGoogle = (response) => {
        if(socialAccountError){
            errorHandlerHook._clearErrors()
        }

        if(type === 'change_account_type' ){
            // _setShowCompleteChangeAccountType('Google')
            recaptcha('change_account_type', _changeAccountType, {token:response.tokenId, provider: 'google'})
        }else{
            _signInWithGoogle(response.tokenId)
        }
    }

    const handleSignInWithBankId = (e) => {
        e.preventDefault()
        if(socialAccountError){
            errorHandlerHook._clearErrors()
        }
        if(type === 'change_account_type' ){
            _setChangeableAccountType('BankID')
            _signInWithBankId()
            // recaptcha('change_account_type', _changeAccountType, {token:response.tokenId, provider: 'bankid'})
        }else {
            _signInWithBankId()
        }
    }

    const _signInWithGoogle = useCallback(
        (values) => {
            dispatch(signInWithGoogle(values));
        },
        [dispatch]
    );

    const _signInWithBankId = useCallback(
        () => {
            dispatch(makeRequestForSignInWithBankId());
        },
        [dispatch]
    );

    const _changeAccountType = useCallback(
        (data) => {
            dispatch(changeAccountType(data));
        },
        [dispatch]
    );


    const _setChangeableAccountType = useCallback((data) => {
        dispatch(setChangeableAccountType(data));
    }, [dispatch]);

    return (
        <>
            <div className={`${containerClassName} socials_buttons_wrapper`}>
                <button className='auth_bank_id auth_social_button'
                    onClick={handleSignInWithBankId}
                >
                    <span>BankID</span>
                </button>

                <GoogleLogin
                    clientId= {process.env.NEXT_PUBLIC_GOOGLE_OAUTH}
                    render={renderProps => (
                        <button
                            className='auth_google auth_social_button'
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                        >
                            <span>Google</span>
                        </button>
                    )}
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />

            </div>
            {socialAccountError && (
                <p className='socials_account_error'>{socialAccountError}</p>
            )}
            </>
    );
}

export default SocialsAuthButtons;