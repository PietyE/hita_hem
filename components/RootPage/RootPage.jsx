import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";

import Header from "components/Header";
import Footer from "components/Footer";

import { getIsSignInUserSelector } from "redux/reducers/user";
import {
  getShowSignIn,
  getShowResetPassword,
  getShowSignUp,
  getShowSuccessfulSignUp,
  getShowSuccessfulCampaignRegistration,
  getShowSuccessfulInvestment,
  getShowSuccessfulResetPassword,
  getShowSuccessfulDeletedAccount,
  getShowConfirmationOfAccountDeleting,
} from "redux/reducers/authPopupWindows.js";
import { getNotificationStatusSelector } from "redux/reducers/notification";
import { bootstap, logOut } from "redux/actions/user";
import IdleTimer from "utils/idle";

const SignIn = dynamic(() => import("components/auth/SignIn"));
const SignUp = dynamic(() => import("components/auth/SignUp"));
const Notification = dynamic(() => import("components/Notification"));
const ResetPassword = dynamic(() => import("components/auth/ResetPassword"));
const SuccessfulSignUpModal = dynamic(() =>
  import("components/SuccessfulSignUpModal")
);
const SuccessfullyCampaignRegistrationModal = dynamic(() =>
  import("components/SuccessfullyCampaignRegistrationModal")
);
const SuccessfulInvestmentModal = dynamic(() =>
  import("components/SuccessfulInvestmentModal")
);
const SuccessfulResetPassword = dynamic(() =>
  import("components/SuccessfulResetPassword")
);
const SuccessfulDeletedAccountModal = dynamic(() =>
  import("components/SuccessfulDeletedAccountModal")
);
const ShowConfirmationOfAccountDeletion = dynamic(() =>
  import("components/ShowConfirmationOfAccountDeletion")
);

const RootPage = ({ children, cookies = {} }) => {
  const dispatch = useDispatch();
  const isAuth = useSelector(getIsSignInUserSelector);
  const showSignInWindow = useSelector(getShowSignIn);
  const showSigUpWindow = useSelector(getShowSignUp);
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

  const _logOut = useCallback(() => {
    dispatch(logOut());
  }, [dispatch]);

  useEffect(() => {
    dispatch(bootstap(cookies));
  }, []);

  useEffect(() => {
    let timer = null;
    if (isAuth) {
      timer = new IdleTimer({
        timeout: 60 * 1,
        onTimeout: _logOut,
        onExpired: _logOut,
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
      <Header cookLng={cookies?.i18next} />
      {children}
      {!!showSignInWindow && <SignIn show={showSignInWindow} />}
      {!!showSigUpWindow && <SignUp show={showSigUpWindow} />}
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
      {!!isNotificationShow && <Notification show={isNotificationShow} />}
      <Footer />
    </div>
  );
};

export default RootPage;
