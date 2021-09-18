import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "components/Header";
import Footer from "components/Footer";
import Notification from "components/Notification";
import SignIn from "components/auth/SignIn";
import SignUp from "components/auth/SignUp";
import ResetPassword from "components/auth/ResetPassword";
import SuccessfulSignUpModal from "components/SuccessfulSignUpModal";
import SuccessfullyCampaignRegistrationModal from "components/SuccessfullyCampaignRegistrationModal";
import SuccessfulInvestmentModal from "components/SuccessfulInvestmentModal";
import SuccessfulResetPassword from "components/SuccessfulResetPassword";
import SuccessfulDeletedAccountModal from "components/SuccessfulDeletedAccountModal";
import ShowConfirmationOfAccountDeletion from "components/ShowConfirmationOfAccountDeletion";

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
import { bootstap } from "redux/actions/user";

const RootPage = ({ children }) => {
  const dispatch = useDispatch();
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

  useEffect(() => {
    dispatch(bootstap());
  }, []);

  return (
    <div className="container">
      <Header />
      {children}
      <SignIn show={showSignInWindow} />
      <SignUp show={showSigUpWindow} />
      <ResetPassword show={showSignResetPassWindow} />
      <SuccessfulSignUpModal show={showSuccessfulSignUpWindow} />
      <SuccessfullyCampaignRegistrationModal
        show={showSuccessfullyCampaignRegistrationModal}
      />
      <SuccessfulInvestmentModal show={showSuccessfulInvestment} />
      <SuccessfulResetPassword show={showSuccessfulResetPassword} />
      <SuccessfulDeletedAccountModal show={showSuccessfulDeletedAccount} />
      <ShowConfirmationOfAccountDeletion
        show={showConfirmationOfAccountDeletion}
      />
      <Notification show={isNotificationShow} />
      <Footer />
    </div>
  );
};

export default RootPage;
