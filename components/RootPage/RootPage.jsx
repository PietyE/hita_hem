import {useEffect, useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import dynamic from "next/dynamic";

import Header from "components/Header";
import Footer from "components/Footer";

import {
    getIsSignInUserSelector,
    getUserEmailSelector,
    getFullNameSelector, getCanResetPasswordSelector
} from "redux/reducers/user";
import {
  getShowSignIn,
  getShowResetPassword,
  getShowSignUp,
  getShowSessionSignUp,
  getShowSuccessfulSignUp,
  getShowSuccessfulCampaignRegistration,
  getShowSuccessfulInvestment,
  getShowSuccessfulResetPassword,
  getShowSuccessfulDeletedAccount,
  getShowConfirmationOfAccountDeleting,
  getShowQuizError,
    getShowQuiz,
  getShowSuccessfulSubscribe,
  getShowRaiseError,
  getShowRequestForChangeEmail,
  getShowRequestForChangePassword,
    getShowInvalidTokenModal,
    getShowSuccessfulChangeEmailOrPassword,
    getShowCookiePopup,
    getShowSuccessfulFaqPopup,
    getShowDataLossWarning,
    getShowFirstLoginPopup,
    getShowPostalCodeNotification,
    getShowCompleteBankIdRegistration,
    getShowCompleteSocialsRegistration,
    getShowSuccessfulQuizMessage,
    getShowOptionalQuizMessage,
    getShowDataLossWarningFromProfile,
} from "redux/reducers/authPopupWindows.js";
import {getNotificationStatusSelector} from "redux/reducers/notification";
import {bootstap, logOut} from "redux/actions/user";
import IdleTimer from "utils/idle";
import {getShowDenyDeletingAccount} from "redux/reducers/authPopupWindows";

import {recaptcha} from "../../utils/recaptcha";
import * as ga from '../../utils/ga'
import {useRouter} from "next/router";
import {setShowSessionSignUp} from "../../redux/actions/authPopupWindows";

const ScrollToTopButton = dynamic(
    () => import("components/ScrollToTopButton"),
    {loading: () => <span></span>}
);
const SignIn = dynamic(() => import("components/auth/SignIn"));
const SignUp = dynamic(() => import("components/auth/SignUp"));
const SessionSignUp = dynamic(() => import("components/auth/SessionSignUp"));

const Notification = dynamic(() => import("components/Notification"));
const ResetPassword = dynamic(() => import("components/auth/ResetPassword"));
const SuccessfulSignUpModal = dynamic(() =>
    import("components/SuccessfulSignUpModal")
);
const SuccessfullyCampaignRegistrationModal = dynamic(() =>
    import("components/SuccessfullyCampaignRegistrationModal"), { ssr: false }
);
const SuccessfulInvestmentModal = dynamic(() =>
    import("components/SuccessfulInvestmentModal"), { ssr: false }
);
const SuccessfulResetPassword = dynamic(() =>
    import("components/SuccessfulResetPassword"), { ssr: false }
);
const SuccessfulDeletedAccountModal = dynamic(() =>
    import("components/SuccessfulDeletedAccountModal"), { ssr: false }
);
const ShowConfirmationOfAccountDeletion = dynamic(() =>
    import("components/ShowConfirmationOfAccountDeletion"), { ssr: false }
);
const QuizWrongAnswersModal = dynamic(() =>
    import("components/QuizWrongAnswersModal"), { ssr: false }
);
const SuccessfullySubscribedModal = dynamic(() =>
    import("components/SuccessfullySubscribedModal"), { ssr: false }
);
const RaiseWrongAnswerModal = dynamic(() =>
    import("components/RaiseWrongAnswersModal"), { ssr: false }
);
const SuccessfulRequestForChange = dynamic(() =>
    import("components/SuccessfulRequestForChange"), { ssr: false }
);

const SuccessfulRequestForChangePassword = dynamic(() =>
    import("components/SuccessfulRequestForChangePassword"), { ssr: false }
);

const InvalidTokenModal = dynamic(() =>
    import("components/InvalidTokenModal"), { ssr: false }
);
const SuccessfulChangeEmailOrPassword = dynamic(() =>
    import("components/SuccessfulChangeEmailOrPassword"), { ssr: false }
);
const ShowDenyDeletingAccount = dynamic(() =>
    import("components/ShowDenyDeletingAccount"), { ssr: false }
);
const SuccessfulQuizMessage = dynamic(() =>
    import("components/SuccessfulQuizMessage"), { ssr: false }
);
const SuccessfulFaqPopup = dynamic(() =>
    import("components/SuccessfulFaqPost"), { ssr: false }
);
const DataLossWarning = dynamic(() =>
    import("components/DataLossWarning"), { ssr: false }
);
const FirstLoginPopup = dynamic(() =>
    import("components/SuccessfulFirstLogin"), { ssr: false }
);

const Quiz = dynamic(() =>
    import("components/QuizPopup"), { ssr: false }
);
const PostalCodeNotification = dynamic(() =>
    import("components/ShowPostalCodeNotification"), { ssr: false }
);

const CookieNotification = dynamic(() =>
    import("components/CookieNotification"), { ssr: false }
);

const CompleteBankIdRegistrationPopup = dynamic(() =>
    import("components/CompleteBankIdRegistrationPopup"), { ssr: false }
);

const CompleteSocialsRegistrationPopup = dynamic(() =>
    import("components/CompleteSocialsRegistrationPopup"), { ssr: false }
);
const SuccessfulOptionalQuiz = dynamic(() =>
    import("components/SuccessfulOptionalQuiz"), { ssr: false }
);
const DataLossWarningFromProfile = dynamic(() =>
    import("components/DataLossWarningFromProfile"), { ssr: false }
);

const RootPage = ({ children, initLang = "" }) => {
  const dispatch = useDispatch();


  // useGoogleCaptcha()
  const isAuth = useSelector(getIsSignInUserSelector);
  const fullName = useSelector(getFullNameSelector);
  const email = useSelector(getUserEmailSelector);
  const showSignInWindow = useSelector(getShowSignIn);
  const showSigUpWindow = useSelector(getShowSignUp);
    const showSessionSigUpWindow = useSelector(getShowSessionSignUp);
    const showSignResetPassWindow = useSelector(getShowResetPassword);
  const showSuccessfulSignUpWindow = useSelector(getShowSuccessfulSignUp);
  const showSuccessfullyCampaignRegistrationModal = useSelector(
    getShowSuccessfulCampaignRegistration
  );
  const showSuccessfulInvestment = useSelector(getShowSuccessfulInvestment);
  const showSuccessfulResetPassword = useSelector(
    getShowSuccessfulResetPassword
  );
  const showSuccessfulDeletedAccount = useSelector(
    getShowSuccessfulDeletedAccount
  );
  const showConfirmationOfAccountDeletion = useSelector(
    getShowConfirmationOfAccountDeleting
  );
  const isNotificationShow = useSelector(getNotificationStatusSelector);
  const isShowQuizErrorPopup = useSelector(getShowQuizError);
  const isShowSuccessfulSubscribe = useSelector(getShowSuccessfulSubscribe);
  const isShowQuizRaisePopup = useSelector(getShowRaiseError);
  const isShowSuccessfulRequestForChangeEmail = useSelector(getShowRequestForChangeEmail)
  const isShowSuccessfulRequestForChangePassword = useSelector(getShowRequestForChangePassword)

  const isShowInvalidTokenModal = useSelector(getShowInvalidTokenModal)
  const isShowSuccessfulChangeEmailOrPassword = useSelector(getShowSuccessfulChangeEmailOrPassword)
  const isShowDenyDeletingAccount = useSelector(getShowDenyDeletingAccount)
  const isShowCookie = useSelector(getShowCookiePopup)
  const isShowFaqPopup = useSelector(getShowSuccessfulFaqPopup)
  const isShowDataLossWarning = useSelector(getShowDataLossWarning)
    const isShowQuiz = useSelector(getShowQuiz)
    const isShowFirstLoginPopup = useSelector(getShowFirstLoginPopup)
    const isShowPostalCodeNotification = useSelector(getShowPostalCodeNotification)
    const isShowCompleteBankIdRegistration = useSelector(getShowCompleteBankIdRegistration)
    const isShowCompleteSocialsRegistration = useSelector(getShowCompleteSocialsRegistration)
    const isShowSuccessfulQuizMessage = useSelector(getShowSuccessfulQuizMessage)
    const isShowOptionalQuizMessage = useSelector(getShowOptionalQuizMessage)
    const showDataLossWarningFromProfile = useSelector(getShowDataLossWarningFromProfile)




    // const canResetPassword = useSelector(getCanResetPasswordSelector)

    const router = useRouter()

    const {pathname} = router

    // const _showSessionSignUp = useCallback(
    //     (data) => {
    //         dispatch(setShowSessionSignUp(data));
    //     },
    //     [dispatch]
    // );


    const _logOut = useCallback((data) => {
        dispatch(logOut(data));
    }, [dispatch]);

    useEffect(() => {
        dispatch(bootstap(initLang));
    }, []);

    const isIntercomLoaded = typeof Intercom === 'function'

    useEffect(()=>{
      if(isIntercomLoaded){
          Intercom("update", {last_request_at: parseInt((new Date()).getTime()/1000)})
      }

      const pie = document.getElementById('dib-pie');

      if(pathname !== '/blog' && !router?.query?.p && pie){
          pie?.classList?.add('hide')
      }else if(pie && pathname === '/blog' && router?.query?.p ){
          pie?.classList?.remove('hide')
      }
  },[pathname])

  useEffect(() => {
    if(email && fullName && initLang && isIntercomLoaded) {
      window.Intercom('boot', {
        app_id: process.env.NEXT_PUBLIC_INTERCOM_APP_ID,
        name: fullName,
        email: email,
        language_override: initLang,
      })
    }
  }, [email, fullName]);

  useEffect(() => {
    // if(process?.env?.NEXT_PUBLIC_CUSTOM_NODE_ENV === "production") {
      const handleRouteChange = (url) => {
        ga.pageview(url)
      }
      //When the component is mounted, subscribe to router changes
      //and log those page views
      router.events.on('routeChangeComplete', handleRouteChange)

      // If the component is unmounted, unsubscribe
      // from the event with the `off` method
      return () => {
        router.events.off('routeChangeComplete', handleRouteChange)
      }
    // }
  }, [router.events])


    
    // useEffect(()=>{
    //     const isServiceStart = sessionStorage.getItem('isServiceWork')
    //     let timerId = null
    //     if(!isAuth && (!isServiceStart || isServiceStart === 'true') && window?.localStorage){
    //         sessionStorage.setItem('isServiceWork', "true")
    //         timerId = setTimeout(()=>{
    //             _showSessionSignUp(true)
    //             sessionStorage.setItem('isServiceWork', "false")
    //         },30000)
    //     }
    //
    //     if(isAuth && isServiceStart === 'true'){
    //         sessionStorage.setItem('isServiceWork', "false")
    //         clearTimeout(timerId)
    //     }
    //     if(isShowQuiz || showSignInWindow || showSigUpWindow || showSignResetPassWindow || canResetPassword || isShowCompleteBankIdRegistration){
    //         clearTimeout(timerId)
    //     }
    //     if(showSuccessfulSignUpWindow && isServiceStart === 'true'){
    //         clearTimeout(timerId)
    //         sessionStorage.setItem('isServiceWork', "false")
    //     }
    //
    //     return () => {
    //         clearTimeout(timerId)
    //     }
    //
    // },[isAuth, isShowQuiz, showSignInWindow, showSigUpWindow, showSignResetPassWindow, canResetPassword, isShowCompleteBankIdRegistration])
    

    useEffect(() => {
        let timer = null;
        if (isAuth) {
            timer = new IdleTimer({
                timeout: 60 * 60 * 24,
                onTimeout: () => recaptcha('logout_on_timeout', _logOut),
                onExpired: () => recaptcha('logout_on_expired', _logOut),
            });
        }

        return () => {
            if (timer && timer instanceof IdleTimer) {
                timer.cleanUp();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuth]);
    return (
    <div className="container">
      <Header initLang={initLang} />
      <main>
        {children}
        {!!showSignInWindow && <SignIn show={showSignInWindow} />}
        {!!showSigUpWindow && <SignUp show={showSigUpWindow} />}
          {!!showSessionSigUpWindow && <SessionSignUp show={showSessionSigUpWindow} />}

          {!!showSignResetPassWindow && (
          <ResetPassword show={showSignResetPassWindow} />
        )}
        {!!showSuccessfulSignUpWindow && (
          <SuccessfulSignUpModal show={showSuccessfulSignUpWindow} />
        )}
        {!!showSuccessfullyCampaignRegistrationModal && (
          <SuccessfullyCampaignRegistrationModal
            show={showSuccessfullyCampaignRegistrationModal}
          />
        )}
        {!!showSuccessfulInvestment && (
          <SuccessfulInvestmentModal show={showSuccessfulInvestment} />
        )}
        {!!showSuccessfulResetPassword && (
          <SuccessfulResetPassword show={showSuccessfulResetPassword} />
        )}
        {!!showSuccessfulDeletedAccount && (
          <SuccessfulDeletedAccountModal show={showSuccessfulDeletedAccount} />
        )}
        {!!showConfirmationOfAccountDeletion && (
          <ShowConfirmationOfAccountDeletion
            show={showConfirmationOfAccountDeletion}
          />
        )}
        {!!isShowQuizErrorPopup && (
          <QuizWrongAnswersModal show={isShowQuizErrorPopup} />
        )}
        {!!isShowSuccessfulSubscribe && (
          <SuccessfullySubscribedModal show={isShowSuccessfulSubscribe} />
        )}
        {!!isShowQuizRaisePopup && (
            <RaiseWrongAnswerModal show={isShowQuizRaisePopup} />
        )}
        {!!isShowSuccessfulRequestForChangeEmail && (
            <SuccessfulRequestForChange show={isShowSuccessfulRequestForChangeEmail}/>
        )}
        {!!isShowSuccessfulRequestForChangePassword && (
            <SuccessfulRequestForChangePassword show={isShowSuccessfulRequestForChangePassword}/>
        )}
        {!!isNotificationShow && <Notification show={isNotificationShow} />}
        {!!isShowInvalidTokenModal && <InvalidTokenModal show={isShowInvalidTokenModal}/>}
        {!!isShowSuccessfulChangeEmailOrPassword && <SuccessfulChangeEmailOrPassword show={isShowSuccessfulChangeEmailOrPassword}/>}
        {!!isShowDenyDeletingAccount && <ShowDenyDeletingAccount show={isShowDenyDeletingAccount}/>}
        {!!isShowFaqPopup && <SuccessfulFaqPopup show={isShowFaqPopup}/>}
        {!!isShowDataLossWarning && <DataLossWarning show={isShowDataLossWarning}/>}
          {!!isShowFirstLoginPopup && <FirstLoginPopup show={isShowFirstLoginPopup}/>}
          {!!isShowQuiz && <Quiz show={!!isShowQuiz}/>}
          {!!isShowPostalCodeNotification && <PostalCodeNotification show={!!isShowPostalCodeNotification}/>}
          {!!isShowCompleteBankIdRegistration && <CompleteBankIdRegistrationPopup show={!!isShowCompleteBankIdRegistration}/>}
          {!!isShowCompleteSocialsRegistration && <CompleteSocialsRegistrationPopup show={!!isShowCompleteSocialsRegistration}/>}
          {!!isShowSuccessfulQuizMessage && <SuccessfulQuizMessage show={!!isShowSuccessfulQuizMessage}/>}
          {!!isShowOptionalQuizMessage && <SuccessfulOptionalQuiz show={!!isShowOptionalQuizMessage}/>}
          {!!showDataLossWarningFromProfile && <DataLossWarningFromProfile data={showDataLossWarningFromProfile}/>}



          {isShowCookie && <CookieNotification/>}


          <ScrollToTopButton />
      </main>
      <Footer />
    </div>
  );
};

export default RootPage;
