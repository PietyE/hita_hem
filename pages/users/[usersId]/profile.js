import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import Collapse from "react-bootstrap/Collapse";
import NavTab from "components/ui/NavTab/NavTab";

import {
  getActiveTabSelector,
  getIsSignInUserSelector,
  getIsFetchingAuthSelector,
} from "redux/reducers/user";
import { setActiveTab } from "redux/actions/user";
import { HOME_ROUTE } from "constants/routesConstant";

import TabBar from "components/ui/TabBar";
import Investment from "containers/ProfilePage/Investment";
import PersonalDetails from "containers/ProfilePage/PersonalDetails";
import AccountSettings from "containers/ProfilePage/AccountSettings";
import ProfilePageCampaigns from "containers/ProfilePage/ProfilePageCampaigns";
import SpinnerStyled from "components/ui/Spinner";
import { usePrevious } from "customHooks/usePrevious";

const ProfilePage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useRouter();

  const activeTab = useSelector(getActiveTabSelector);
  const isAuth = useSelector(getIsSignInUserSelector);
  const isFetching = useSelector(getIsFetchingAuthSelector);
  const prevIsFetch = usePrevious(isFetching);

  useEffect(() => {
    if (!isAuth && !isFetching && prevIsFetch) {
      history.push(HOME_ROUTE);
    }
  }, [isAuth, history, isFetching]);

  const handleClick = (key) => {
    dispatch(setActiveTab(key));
  };

  if (!isAuth) {
    return <SpinnerStyled />;
  }

  return (
    <>
      {isFetching && <SpinnerStyled />}
      <section className="profile_section">
        <div className='profile_section_content_container'>
        <TabBar
          data={[
            { name: t("profile_page.investment"), key: "investment" },
            {
              name: t("profile_page.personal_details"),
              key: "personal_details",
            },
            {
              name: t("profile_page.account_settings"),
              key: "account_settings",
            },
            { name: t("profile_page.profile_campaigns"), key: "campaigns" },
          ]}
          onClick={handleClick}
          selectedKey={activeTab}
          className="profile_tab_bar"
        />

        <TabContent activeTab={activeTab}/>
        </div>
      </section>
      <section className="profile_section_mobile">
        <NavTab tab={activeTab} change={handleClick} />
        <Collapse in={activeTab === "investment"}>
          <div id="investment">
            <Investment />
          </div>
        </Collapse>
        <Collapse in={activeTab === "personal_details"}>
          <div id="personal_details">
            <PersonalDetails />
          </div>
        </Collapse>
        <Collapse in={activeTab === "account_settings"}>
          <div id="account_settings">
            <AccountSettings />
          </div>
        </Collapse>
        <Collapse in={activeTab === "campaigns"}>
          <div id="campaigns">
            <ProfilePageCampaigns />
          </div>
        </Collapse>
      </section>
    </>
  );
};

const TabContent = ({ activeTab }) => {
  switch (activeTab) {
    case "investment":
      return <Investment />;
    case "personal_details":
      return <PersonalDetails />;
    case "account_settings":
      return <AccountSettings />;
    case "campaigns":
      return <ProfilePageCampaigns />;
    default:
      return null;
  }
};

export default ProfilePage;
