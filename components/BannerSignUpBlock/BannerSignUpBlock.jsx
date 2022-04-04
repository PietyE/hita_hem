import React, {useCallback, useRef} from 'react';
import {GoogleLogin} from "react-google-login";
import {useDispatch, useSelector} from "react-redux";
// import {useTranslation} from "react-i18next";
import {makeRequestForSignInWithBankId, saveEmail, signInWithGoogle} from "../../redux/actions/user";
import ButtonStyled from "../ui/Button";
import {setShowSignUp} from "../../redux/actions/authPopupWindows";
import {getAuthSocialAccountErrorSelector} from "../../redux/reducers/errors";
import useAuthErrorHandler from "../../customHooks/useAuthErrorHandler";

const BannerSignUpBlock = () => {
    // const { t } = useTranslation();
    const dispatch = useDispatch();
    const inputRef = useRef(null)
    const socialAccountError = useSelector(getAuthSocialAccountErrorSelector)
    const errorHandlerHook = useAuthErrorHandler()

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

    const _setShowSignUp = useCallback(
        (data) => {
            dispatch(setShowSignUp(data));
        },
        [dispatch]
    );

    const _saveEmail = useCallback(
        (data) => {
            dispatch(saveEmail(data));
        },
        [dispatch]
    );

    const handleSignInWithBankId = (e) => {
        e.preventDefault()
        if(socialAccountError){
            errorHandlerHook._clearErrors()
        }
        _signInWithBankId()
    }

    const responseGoogle = (response) => {
        if(socialAccountError){
            errorHandlerHook._clearErrors()
        }
        _signInWithGoogle(response.tokenId)
    }

    const handleSignUp = () => {
        _setShowSignUp(true);
        if(inputRef?.current?.value){
            _saveEmail(inputRef.current.value)
            inputRef.current.value = ''
        }
        if(socialAccountError){
            errorHandlerHook._clearErrors()
        }
    }

    return (
        <div className='banner_button_wrapper'>

            <label className='banner_label'>
                <input ref={inputRef} placeholder='Your email address' type='text' className='banner_input'/>
                <ButtonStyled
                    colorStyle='dark-green'
                    className='banner_button'
                    onClick={handleSignUp}
                >
                    Register
                </ButtonStyled>
            </label>

            <p className='sign_in_alt_text'>or</p>

            <div className='sign_in_socials_buttons_wrapper'>
                <button className='sign_in_bank_id sign_in_social_button' onClick={handleSignInWithBankId}>
                    BankID
                </button>

                <GoogleLogin
                    clientId= {process.env.NEXT_PUBLIC_GOOGLE_OAUTH}
                    // buttonText="Google"
                    render={renderProps => (
                        <button
                            className='sign_in_google sign_in_social_button'
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
                <p className='sign_in_socials_account_error'>{socialAccountError}</p>
            )}
        </div>

    );
}

export default BannerSignUpBlock;