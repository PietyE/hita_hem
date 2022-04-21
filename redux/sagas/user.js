import {takeEvery, call, put, select} from "redux-saga/effects";
import i18n from "i18next";
import Cookies from "js-cookie";
import {
    BOOTSTAP_ACTION,
    SIGN_IN,
    SIGN_UP,
    CREATE_PROFILE,
    CHANGE_PROFILE,
    LOG_OUT,
    RESET_PASSWORD,
    CHANGE_PASSWORD,
    CHANGE_EMAIL,
    DELETE_ACCOUNT,
    REQUEST_FOR_CHANGING_EMAIL,
    REQUEST_FOR_CHANGING_PASSWORD,
    REQUEST_FOR_RESET_PASSWORD,
    CHECK_TOKEN, CLEAN_AUTH_DATA,
    GET_QUIZ, CHECK_QUIZ_ANSWERS,
    GET_PROFILE_FROM_API,
    CHECK_TOKEN_FOR_RESET_PASSWORD,
    CHECK_ACTIVATION_TOKEN,
    SIGN_IN_WITH_BANK_ID,
    REQUEST_SIGN_IN_WITH_BANK_ID,
    SIGN_IN_WITH_GOOGLE,
    SET_IS_AUTH_ON_AND_SAVE_USER_PROFILE,
    SIGN_UP_WITH_BANK_ID, REQUEST_SUBSCRIBE_LIST,
    CHANGE_UNSUBSCRIBE_LIST,
    SIGN_UP_WITH_SOCIALS,
} from "constants/actionsConstant";
import {setSelectedLanguage} from "redux/actions/language";
import {
    setAccount,
    setAuth,
    setToken,
    setProfile,
    setFetchingUsers,
    setCanChangeEmail,
    cleanAuthData,
    setCanResetPassword,
    setCanChangePassword,
    setQuiz,
    setIsAthOnAndSaveUserProfile,
    setBIdKey,
    setSubscribeList,
    setSocialsKey,
} from "redux/actions/user";
import {
    setShowSignIn,
    setShowSignUp,
    setShowSessionSignUp,
    setShowSuccessfulSignUp,
    setShowSuccessfulResetPassword,
    setShowResetPassword,
    setShowSuccessfulDeletedAccount,
    setShowConfirmationOfAccountDeleting,
    setShowInvalidTokenModal,
    setShowChangeEmailOrPassword,
    setChangeEmailOrPasswordText,
    setShowQuiz,
    setShowQuizError,
    setShowCookiePopup,
    setShowDenyDeletingAccount,
    setShowRequestForChangeEmail,
    setShowRequestForChangePassword,
    setShowFirstLoginPopup,
    setShowCompleteBankIdRegistration,
    setShowCompleteSocialsRegistration, setShowSuccessfulQuizMessage, setShowOptionalQuizMessage,
} from "../actions/authPopupWindows";
import {getBIdKeySelector, getQuizIsPassedSelector, getSocialsKeySelector, getUserIdSelector} from "../reducers/user";
import {setAuthError, setProfileError, clearErrors} from "../actions/errors";
import {
    setIsBankIdResident,
    setQuizErrors,
    setQuizIsPassed,
    setResponseFromApi,
    setTokenForQuizSocialsSignIn, setUnSubscribeList
} from "../actions/user";
import api from "api";
import {getDocumentsWorker} from "./documents";
import {getSelectedLangSelector} from "../reducers/language";
import {getRedirectUrl} from "../../utils/utils";
import {HOME_ROUTE} from "../../constants/routesConstant";

const {auth} = api;


export function* bootstarpWorker({payload: initLang}) {
    try {
        yield put(setFetchingUsers(true));

        const systemLang = initLang || i18n.language;

        /////////////////////////////
        const pathname = window.location.pathname;
        const currentSiteLanguage = pathname.includes('/en') ? 'en' : 'sv'
        const cookieSelectedLanguage = yield call([Cookies, "get"], "NEXT_LOCALE");
        //////////////////////////////////////
        yield call([api, "setLanguage"], systemLang);

        yield put(setSelectedLanguage(systemLang));

        if (!initLang || cookieSelectedLanguage !== currentSiteLanguage) {
            yield call([Cookies, "set"], "NEXT_LOCALE", systemLang);
        }
        yield call(uploadUserData)

        const isCookieAccepted = !!(yield call([Cookies, "get"], "cookie-agreed"))

        if (!isCookieAccepted) {
            yield put(setShowCookiePopup(true))
        }

        yield call(getDocumentsWorker);
        yield put(clearErrors())

    } catch (error) {
        yield put(
            setAuthError({status: error.response.status, data: error.response.data})
        );
    } finally {
        yield put(setFetchingUsers(false));
    }
}

function* signUp({payload}) {
    try {
        yield put(setFetchingUsers(true));
        const response = yield call([auth, "signUp"], {token: payload.token, data: payload.data});
        if (response.status === 201) {
            yield put(setShowSignUp(false));
            yield put(setShowSessionSignUp(false));
            yield put(setShowSuccessfulSignUp(true));
        }
        yield put(clearErrors())

    } catch (error) {
        const hideNotification = !!error?.response?.data?.email || !!error?.response?.data?.password || !!error?.response?.data?.confirm_password
        yield put(
            setAuthError({
                status: error.response.status,
                data: error.response.data,
                hideNotification: hideNotification
            })
        );
    } finally {
        yield put(setFetchingUsers(false));
    }
}

function* signIn({payload}) {
    try {
        yield put(setFetchingUsers(true));

        yield call([localStorage, 'removeItem'], '_expiredTime')

        const session_key_from_LS = yield call([localStorage, "getItem"], "x_session_key");
        const session_key = session_key_from_LS || new Date().getTime();

        const response = yield call([auth, "signIn"], {
            token: payload.token,
            data: payload.data,
            session_key: session_key,
        });

        if (!session_key_from_LS) {
            yield call([localStorage, "setItem"], "x_session_key", session_key);
        }

        if(response?.data?.first_time_device && !response?.data?.user?.quiz){
                yield call(requestForQuiz)
        }

        const {data} = response;

        yield put(setIsAthOnAndSaveUserProfile(data))
    } catch (error) {
        const hideNotification = !!error?.response?.data?.email || !!error?.response?.data?.password
        yield put(
            setAuthError({
                status: error?.response?.status,
                data: error?.response?.data,
                hideNotification: hideNotification
            })
        );
    } finally {
        yield put(setFetchingUsers(false));
    }
}

function* signInWithGoogle({payload}) {
    try {
            if(!payload){
                return
            }

        yield call([localStorage, 'removeItem'], '_expiredTime')
        yield put(setFetchingUsers(true));

        const session_key_from_LS = yield call([localStorage, "getItem"], "x_session_key");
        const session_key = session_key_from_LS || new Date().getTime();

        const response = yield call([auth, "signInWithGoogle"], {
            token: payload,
            session_key: session_key,
        });

        if (!session_key_from_LS) {
            yield call([localStorage, "setItem"], "x_session_key", session_key);
        }

        if(response?.data?.first_time_device && !response?.data?.user?.quiz){
            yield call(requestForQuiz)
        }

        const {data} = response;
            yield put(setIsAthOnAndSaveUserProfile(data))
    } catch (error) {
        if(error?.response?.data?.user){
            yield put(setShowCompleteSocialsRegistration(true))
            yield put(setSocialsKey(payload))
        }else{
            const hideNotification = !!error?.response?.data?.social_account
            yield put(
                setAuthError({
                    status: error?.response?.status,
                    data: error?.response?.data,
                    hideNotification: hideNotification
                })
            );
        }

    } finally {
        yield put(setFetchingUsers(false));
    }
}

function* signUpWithSocialsWorker({payload}) {
    try {
        yield put(setFetchingUsers(true));
        const sessionId = yield select(getSocialsKeySelector)

        const session_key_from_LS = yield call([localStorage, "getItem"], "x_session_key");
        const session_key = session_key_from_LS || new Date().getTime();
        const response = yield call([auth, "signInWithGoogle"], {
            token: sessionId,
            is_agree: payload,
            session_key: session_key,

        });
        if (!session_key_from_LS) {
            yield call([localStorage, "setItem"], "x_session_key", session_key);
        }
        const {data} = response;
        yield put(setIsAthOnAndSaveUserProfile(data))

        if(response?.data?.first_time_device && !response?.data?.user?.quiz){
            yield call(requestForQuiz)
        }
        yield put(setShowCompleteSocialsRegistration(false))
        yield put(setSocialsKey(''))
    } catch (error) {
        yield put(
            setAuthError({status: error?.response?.status,data: error?.response?.data,})
        );
    } finally {
        yield put(setFetchingUsers(false));
    }
}


function* makeRequestForSignInWithBankIdWorker() {
    try {
        yield call([localStorage, "setItem"], "current_pathname", window?.location?.pathname);
        yield put(setFetchingUsers(true));
        const language = yield select(getSelectedLangSelector)
        const link = getRedirectUrl(language)
        const response = yield call([auth, "requestLoginWithBankId"], `?callbackUrl=${link}`);
        if (response?.data?.redirectUrl) {
            window.open(response?.data?.redirectUrl, '_self');
        }
    } catch (error) {
        yield put(
            setAuthError({status: error?.response?.status, data: error?.response?.data})
        );
    } finally {
        yield put(setFetchingUsers(false));
    }
}

function* signInWithBankIdWorker({payload}) {
    try {
        yield put(setFetchingUsers(true));
        yield call([localStorage, 'removeItem'], '_expiredTime')

        const session_key_from_LS = yield call([localStorage, "getItem"], "x_session_key");
        const session_key = session_key_from_LS || new Date().getTime();
        const response = yield call([auth, "loginWithBankId"], {
            grand_id_session: payload?.data,
            session_key: session_key,
        });
        if (!session_key_from_LS) {
            yield call([localStorage, "setItem"], "x_session_key", session_key);
        }


            yield put(setIsAthOnAndSaveUserProfile(response?.data))
            const current_pathname = yield call([localStorage, "getItem"], "current_pathname");
            yield call([localStorage, 'removeItem'], 'current_pathname')
            payload?.action?.push(current_pathname || HOME_ROUTE)

        if(response?.data?.first_time_device && !response?.data?.user?.quiz){
            yield call(requestForQuiz)
        }
    } catch (error) {
        if(error?.response?.data?.user){
            yield put(setShowCompleteBankIdRegistration(true))
            yield put(setBIdKey(payload?.data))
        }else{
            yield put(
                setAuthError({status: error?.response?.status, data: error?.response?.data})
            );
        }

    } finally {
        yield put(setFetchingUsers(false));
    }
}


function* signUpWithBankIdWorker({payload}) {
    try {
        yield put(setFetchingUsers(true));
        const sessionId = yield select(getBIdKeySelector)

        const session_key_from_LS = yield call([localStorage, "getItem"], "x_session_key");
        const session_key = session_key_from_LS || new Date().getTime();
        const response = yield call([auth, "loginWithBankId"], {
            grand_id_session: sessionId,
            email: payload?.email,
            is_agree: payload?.is_agree,
            session_key: session_key,

        });
        if (!session_key_from_LS) {
            yield call([localStorage, "setItem"], "x_session_key", session_key);
        }
        const {data} = response;
        yield put(setIsAthOnAndSaveUserProfile(data))
        const current_pathname = yield call([localStorage, "getItem"], "current_pathname");
        yield call([localStorage, 'removeItem'], 'current_pathname')
        payload?.action?.push(current_pathname || HOME_ROUTE)

        if(response?.data?.first_time_device && !response?.data?.user?.quiz){
            yield call(requestForQuiz)
        }
        yield put(setShowCompleteBankIdRegistration(false))
        yield put(setBIdKey(''))
    } catch (error) {
        const hideNotification =  !!error?.response?.data?.email

        yield put(
                setAuthError({
                    status: error?.response?.status,
                    data: error?.response?.data,
                    hideNotification:hideNotification,
                })
            );

    } finally {
        yield put(setFetchingUsers(false));
    }
}


function* logout({payload}) {
    try {
        yield put(setFetchingUsers(true));
        yield call([auth, "logOut"], {token: payload.token});
        yield put(setIsBankIdResident(false))
        yield put(setTokenForQuizSocialsSignIn(false))

        yield call(clean);
    } catch (error) {
        yield put(
            setAuthError({status: error?.response?.status, data: error?.response?.data})
        );
    } finally {
        yield put(setFetchingUsers(false));
    }
}

function* createUserProfile({payload}) {
    try {
        yield put(setFetchingUsers(true));
        yield call([auth, "createProfile"], {token: payload.token, data: payload.data.profile});

        if (payload.data.image) {
            yield call([auth, "changeAvatar"], payload.data.image);
        }

        yield call(getProfileFromApi);
        yield put(clearErrors())

    } catch (error) {
        const hideNotification = !!error?.response?.data?.first_name || !!error?.response?.data?.second_name || !!error?.response?.data?.date_of_birth || !!error?.response?.data?.address?.country || !!error?.response?.data?.address?.city || !!error?.response?.data?.address?.address || !!error?.response?.data?.personal_id || !!error?.response?.data?.companies || !!error?.response?.data?.zip_code || !!error?.response?.data?.image || !!error?.response?.data?.email
        yield put(
            setProfileError({
                status: error.response.status,
                data: error.response.data,
                hideNotification: hideNotification,

            })
        );
    } finally {
        yield put(setFetchingUsers(false));
    }
}

function* changeUserProfile({payload}) {
    try {
        yield put(setFetchingUsers(true));
        yield call([auth, "changeProfile"], {token: payload.token, data: payload.data.profile});
        if (payload.data.image) {
            yield call([auth, "changeAvatar"], payload.data.image);
        } else if (payload.data.image === null) {
            yield call([auth, "deleteAvatar"]);

        }

        yield call(getProfileFromApi);
        yield put(clearErrors())

    } catch (error) {
        const hideNotification = !!error?.response?.data?.first_name || !!error?.response?.data?.second_name || !!error?.response?.data?.date_of_birth || !!error?.response?.data?.address?.country || !!error?.response?.data?.address?.city || !!error?.response?.data?.address?.address || !!error?.response?.data?.personal_id || !!error?.response?.data?.companies || !!error?.response?.data?.zip_code || !!error?.response?.data?.image || !!error?.response?.data?.email
        yield put(
            setProfileError({
                status: error.response.status,
                data: error.response.data,
                hideNotification: hideNotification,

            })
        );
    } finally {
        yield put(setFetchingUsers(false));
    }
}

function* requestForResetUserPassword({payload}) {
    try {
        yield put(setFetchingUsers(true));
        yield call([auth, "requestForResetPassword"], {token: payload.token, data: {email: payload.data}});
        yield put(setShowResetPassword(false));
        yield put(setShowSuccessfulResetPassword(true));
        yield put(clearErrors())

    } catch (error) {
        const hideNotification = !!error?.response?.data?.email || !!error?.response?.data?.user
        yield put(
            setAuthError({
                status: error.response.status, data: error.response.data, hideNotification: hideNotification,
            })
        );
    } finally {
        yield put(setFetchingUsers(false));
    }
}

function* resetUserPassword({payload}) {
    try {
        yield put(setFetchingUsers(true));
        yield call([auth, "resetPassword"], {token: payload.token, data: payload.data});
        const language = yield select(getSelectedLangSelector)
        yield put(setChangeEmailOrPasswordText(language === 'en' ? 'Your password has been successfully updated.' : 'Ditt lösenord har uppdaterats.'))
        yield put(setShowChangeEmailOrPassword(true))
        yield put(setCanResetPassword(false))
        yield put(clearErrors())
        yield put(cleanAuthData())
    } catch (error) {
        const hideNotification = !!error?.response?.data?.new_password1 || !!error?.response?.data?.new_password2

        yield put(
            setAuthError({
                status: error.response.status,
                data: error.response.data,
                hideNotification: hideNotification,
            })
        );
    } finally {
        yield put(setFetchingUsers(false));
    }
}

function* changeUserPassword({payload}) {
    try {
        yield put(setFetchingUsers(true));
        yield call([auth, "changePassword"], {token: payload.token, data: payload.data});
        const language = yield select(getSelectedLangSelector)
        yield put(setChangeEmailOrPasswordText(language === 'en' ? 'Your password has been successfully updated.' : 'Ditt lösenord har uppdaterats.'))
        yield put(setShowChangeEmailOrPassword(true))
        yield put(setCanChangePassword(false))
        yield put(clearErrors())
        yield put(cleanAuthData())
    } catch (error) {
        const hideNotification = !!error?.response?.data?.old_password || !!error?.response?.data?.new_password1 || !!error?.response?.data?.new_password2
        yield put(
            setAuthError({
                status: error.response.status,
                data: error.response.data,
                hideNotification: hideNotification,
            })
        );
    } finally {
        yield put(setFetchingUsers(false));
    }
}

function* changeUserEmail({payload}) {
    try {
        yield put(setFetchingUsers(true));
        yield call([auth, "changeEmail"], {token: payload.token, data: payload.data});
        yield put(setResponseFromApi(true));
        const language = yield select(getSelectedLangSelector)
        yield put(setChangeEmailOrPasswordText(language === 'en' ? 'Your mail has been successfully updated.' : 'Din mail har updateras.'))
        yield put(setShowChangeEmailOrPassword(true))
        yield put(setCanChangeEmail(false))
        yield put(clearErrors())
        yield put(cleanAuthData())
    } catch (error) {
        const hideNotification = !!error?.response?.data?.email || !!error?.response?.data?.user || !!error?.response?.data?.password

        yield put(
            setAuthError({
                status: error?.response?.status,
                data: error?.response?.data,
                hideNotification: hideNotification,
            })
        );
    } finally {
        yield put(setFetchingUsers(false));
    }
}

export function* getProfileFromApi() {
    try {
        yield put(setFetchingUsers(true));
        const response = yield call([auth, "getSelf"]);
        if (response?.data?.is_bank_id_resident) {
            yield put(setIsBankIdResident(true))
        }
        if (response.status !== 200) {
            yield put(setAuth(false));
            return;
        }
        if (response?.data?.profile?.date_of_birth) {
            const profileCopy = prepareProfile(response.data.profile);
            yield put(setProfile(profileCopy));
        } else {
            yield put(setProfile(response.data.profile));
        }
        if (response?.data?.quiz) {
            yield put(setQuizIsPassed(response.data.quiz));
        }
    } catch (error) {
        yield put(
            setAuthError({status: error.response.status, data: error.response.data})
        );
    } finally {
        yield put(setFetchingUsers(false));
    }
}

export function* deleteUserAccount() {
    try {
        yield put(setFetchingUsers(true));
        let userId = yield select(getUserIdSelector);
        yield call([auth, "deleteUser"], userId);
        yield put(setShowConfirmationOfAccountDeleting(false));
        yield put(setShowSuccessfulDeletedAccount(true));
        yield call(clean);
    } catch (error) {
        if (error?.response?.status === 400 && error?.response?.data?.delete) {
            yield put(setShowConfirmationOfAccountDeleting(false));
            yield put(setShowDenyDeletingAccount(true))
        } else {
            yield put(
                setAuthError({status: error?.response?.status, data: error?.response?.data})
            );
        }

    } finally {
        yield put(setFetchingUsers(false));
    }
}

function* requestForChangingEmail({payload}) {
    try {
        yield put(setFetchingUsers(true));
        yield call([auth, "requestForChangingEmail"], {token: payload.token});
        yield put(setShowRequestForChangeEmail(true));
    } catch (error) {
        yield put(
            setAuthError({status: error?.response?.status, data: error?.response?.data})
        );
    } finally {
        yield put(setFetchingUsers(false));
    }
}

function* requestForChangingPassword({payload}) {
    try {
        yield put(setFetchingUsers(true));
        yield call([auth, "requestForChangingPassword"], {token: payload.token});
        yield put(setShowRequestForChangePassword(true));
    } catch (error) {
        yield put(
            setAuthError({status: error?.response?.status, data: error?.response?.data})
        );
    } finally {
        yield put(setFetchingUsers(false));
    }
}

function* requestForCheckingToken({payload}) {
    try {
        yield put(setFetchingUsers(true));
        yield call([auth, "requestForTokenVerification"], payload?.key);
        if (payload?.type === 'email') {
            yield put(setCanChangeEmail(true))
        } else if (payload?.type === 'password') {
            yield put(setCanChangePassword(true))
        }
    } catch (error) {
        if (error?.response?.status === 404) {
            yield put(setShowInvalidTokenModal(true))
        } else {
            yield put(
                setAuthError({status: error?.response?.status, data: error?.response?.data})
            );
        }

    } finally {
        yield put(setFetchingUsers(false));
    }
}

function* requestForQuiz(props) {
    try {
        yield put(setFetchingUsers(true));
        const res = yield call([auth, "requestForQuiz"]);
        yield put(setQuiz(res?.data))
        if(props?.payload !== 'from_profile'){
            yield put(setShowQuiz(true))
        }
    } catch (error) {
        yield put(
            setAuthError({status: error?.response?.status, data: error?.response?.data})
        );
    } finally {
        yield put(setFetchingUsers(false));
    }
}

function* requestForCheckingQuiz({payload}) {
    try {

        yield put(setFetchingUsers(true));
        if (typeof window !== "undefined") {
            window.scrollTo({
                top: 0,
                behavior: "auto",
            });
        }
        yield call([auth, "checkQuizAnswers"], {answers:payload});
        yield put(setShowQuiz(false))
        const isQuizPassed = yield select(getQuizIsPassedSelector)
        if(!isQuizPassed){
            yield put(setShowSuccessfulQuizMessage(true))
            yield put(setQuizErrors(null))
        }else{
            yield put(setShowOptionalQuizMessage(true))
        }
        yield call(uploadUserData)
    } catch (error) {
        if (error?.response?.data?.questions) {
            yield put(setQuizErrors(error?.response?.data?.questions))
            yield put(setShowQuizError(true))
        } else {
            yield put(
                setAuthError({status: error?.response?.status, data: error?.response?.data})
            );
        }


    } finally {
        yield put(setFetchingUsers(false));
    }
}

function* passwordResetTokenVerificationRequest({payload}) {
    try {
        yield put(setFetchingUsers(true));
        yield call([auth, "requestForPasswordResetTokenVerification"], payload);
        yield put(setCanResetPassword(true))
        yield call([api, "setToken"], payload?.key);
    } catch (error) {
        if (error?.response?.status === 401 || error?.response?.status === 404) {
            yield put(setShowInvalidTokenModal(true))
        } else {
            yield put(
                setAuthError({status: error?.response?.status, data: error?.response?.data})
            );
        }


    } finally {
        yield put(setFetchingUsers(false));
    }
}

function* activationTokenVerificationRequest({payload}) {
    try {
        yield put(setFetchingUsers(true));
        yield call([auth, "requestActivationTokenVerification"], payload);
        yield put(setShowFirstLoginPopup(true))
    } catch (error) {
        yield put(
            setAuthError({status: error?.response?.status, data: error?.response?.data})
        );
    } finally {
        yield put(setFetchingUsers(false));
    }
}

function* uploadUserData() {
    try {
        const auth_data = yield call([localStorage, "getItem"], "auth_data");
        if (auth_data) {
            const data = JSON.parse(auth_data);
            const {expiration_timestamp, key: token} = data;
            const nowTime = Math.floor(new Date().getTime() / 1000);

            if (token && expiration_timestamp && nowTime < expiration_timestamp) {
                yield call([api, "setToken"], token);
                const response = yield call([auth, "getSelf"]);
                if (response?.data?.is_bank_id_resident) {
                    yield put(setIsBankIdResident(true))
                }
                if (response?.status !== 200) {
                    yield put(setAuth(false));
                    return;
                }
                if (response?.data?.profile?.date_of_birth) {
                    const profileCopy = prepareProfile(response.data.profile);
                    yield put(setProfile(profileCopy));
                } else {
                    yield put(setProfile(response.data.profile));
                }

                yield put(setToken(token));
                yield put(setAccount(response.data));
                yield put(setAuth(true));

            } else {
                yield put(setAuth(false));
            }
        } else {
            yield put(setAuth(false));
            yield call([localStorage, "removeItem"], "auth_data");
        }
    } catch {
        yield put(
            setAuthError({status: error.response.status, data: error.response.data})
        );
    }
}



function* requestSubscribeListWorker() {
    try{
        yield put(setFetchingUsers(true));
        const response = yield call([auth, "requestSubscribeList"]);
        yield put (setSubscribeList(response?.data))

    } catch (error) {
        yield put(
            setAuthError({status: error?.response?.status, data: error?.response?.data})
        );
    } finally {
        yield put(setFetchingUsers(false));
    }
}

function* changeUnsubscribeListWorker({payload}) {
    try{
        yield put(setFetchingUsers(true));
        yield call([auth, "unsubscribe"], {token: payload?.token, data:{unsubscribes:payload?.data}});
        const response = yield call([auth, "getSelf"]);
        yield put(setUnSubscribeList(response?.data?.unsubscribes))

    } catch (error) {
        yield put(
            setAuthError({status: error?.response?.status, data: error?.response?.data})
        );
    } finally {
        yield put(setFetchingUsers(false));
    }
}




function* setIsAuthOnAndSaveUserProfileWatcher({payload}) {
    const {user, token} = payload;
    yield put(setAccount(user));

    if (user?.profile?.date_of_birth) {
        const profileCopy = prepareProfile(user.profile);
        yield put(setProfile(profileCopy));
    } else {
        if (user?.profile) {
            yield put(setProfile(user.profile));
        }
    }

    yield put(setToken(token));
    yield put(setAuth(true));
    yield call([api, "setToken"], token.key);
    const authData = JSON.stringify({key: token.key, expiration_timestamp: token.expiration_timestamp});
    yield call([localStorage, "setItem"], "auth_data", authData);

    yield put(setShowSignIn(false));
    yield put(setShowSessionSignUp(false));
    yield put(setShowSignUp(false));
    yield put(clearErrors())
}





function* clean() {
    yield put(setAccount({}));
    yield put(setToken({}));
    yield put(setProfile({}));
    yield call([localStorage, "removeItem"], "auth_data");
    yield put(setAuth(false));
    yield call([api, "deleteToken"]);
    yield put(clearErrors())
    yield put(setIsBankIdResident(false))
    yield put(setTokenForQuizSocialsSignIn(false))
    const initLang = yield select(getSelectedLangSelector)
    window.Intercom('shutdown')
    window.Intercom('boot', {
        app_id: process.env.NEXT_PUBLIC_INTERCOM_APP_ID,
        language_override: initLang,
    })
}

const prepareProfile = (data) => {
    const profileCopy = JSON.parse(JSON.stringify(data));
    const dateArr = profileCopy.date_of_birth.split("-");
    delete profileCopy.date_of_birth;
    profileCopy.day = Number(dateArr[2]);
    profileCopy.month = Number(dateArr[1]);
    profileCopy.year = Number(dateArr[0]);
    return profileCopy;
};

export function* userWorker() {
    yield takeEvery(BOOTSTAP_ACTION, bootstarpWorker);
    yield takeEvery(SIGN_UP, signUp);
    yield takeEvery(SIGN_IN, signIn);
    yield takeEvery(LOG_OUT, logout);
    yield takeEvery(CREATE_PROFILE, createUserProfile);
    yield takeEvery(CHANGE_PROFILE, changeUserProfile);
    yield takeEvery(RESET_PASSWORD, resetUserPassword);
    yield takeEvery(REQUEST_FOR_RESET_PASSWORD, requestForResetUserPassword);
    yield takeEvery(CHANGE_PASSWORD, changeUserPassword);
    yield takeEvery(CHANGE_EMAIL, changeUserEmail);
    yield takeEvery(DELETE_ACCOUNT, deleteUserAccount);
    yield takeEvery(REQUEST_FOR_CHANGING_EMAIL, requestForChangingEmail);
    yield takeEvery(REQUEST_FOR_CHANGING_PASSWORD, requestForChangingPassword);
    yield takeEvery(CHECK_TOKEN, requestForCheckingToken)
    yield takeEvery(CHECK_TOKEN_FOR_RESET_PASSWORD, passwordResetTokenVerificationRequest)
    yield takeEvery(CLEAN_AUTH_DATA, clean)
    yield takeEvery(GET_QUIZ, requestForQuiz)
    yield takeEvery(CHECK_QUIZ_ANSWERS, requestForCheckingQuiz)
    yield takeEvery(GET_PROFILE_FROM_API, getProfileFromApi)
    yield takeEvery(CHECK_ACTIVATION_TOKEN, activationTokenVerificationRequest)
    yield takeEvery(SIGN_IN_WITH_BANK_ID, signInWithBankIdWorker)
    yield takeEvery(REQUEST_SIGN_IN_WITH_BANK_ID, makeRequestForSignInWithBankIdWorker)
    yield takeEvery(SIGN_IN_WITH_GOOGLE, signInWithGoogle)
    yield takeEvery(SET_IS_AUTH_ON_AND_SAVE_USER_PROFILE, setIsAuthOnAndSaveUserProfileWatcher)
    yield takeEvery(SIGN_UP_WITH_BANK_ID, signUpWithBankIdWorker)
    yield takeEvery(REQUEST_SUBSCRIBE_LIST, requestSubscribeListWorker)
    yield takeEvery(CHANGE_UNSUBSCRIBE_LIST, changeUnsubscribeListWorker)
    yield takeEvery(SIGN_UP_WITH_SOCIALS, signUpWithSocialsWorker)








}

