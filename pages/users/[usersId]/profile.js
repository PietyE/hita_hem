import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import Collapse from "react-bootstrap/Collapse";
import NavTab from "components/ui/NavTab/NavTab";

import {
  getActiveTabSelector,
  isSignInUserSelector,
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

const ProfilePage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useRouter();

  const activeTab = useSelector(getActiveTabSelector);
  const isAuth = useSelector(isSignInUserSelector);
  const isFetching = useSelector(getIsFetchingAuthSelector);

  useEffect(() => {
    if (!isAuth) {
      history.push(HOME_ROUTE);
    }
  }, [isAuth, history]);

  useEffect(() => {
    setChosen(activeTab);
  }, [activeTab]);

  const [chosen, setChosen] = useState(activeTab);

  const handleClick = (key) => {
    setChosen(key);
    dispatch(setActiveTab(key));
  };

  const TabContent = () => {
    switch (chosen) {
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

  return (
    <>
      {isFetching && <SpinnerStyled />}
      <section className="profile_section">
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
          selectedKey={chosen}
          className="profile_tab_bar"
        />

        <TabContent />
      </section>
      <section className="profile_section_mobile">
        <NavTab tab={chosen} change={handleClick} />
        <Collapse in={chosen === "investment"}>
          <div id="investment">
            <Investment />
          </div>
        </Collapse>
        <Collapse in={chosen === "personal_details"}>
          <div id="personal_details">
            <PersonalDetails />
          </div>
        </Collapse>
        <Collapse in={chosen === "account_settings"}>
          <div id="account_settings">
            <AccountSettings />
          </div>
        </Collapse>
        <Collapse in={chosen === "campaigns"}>
          <div id="campaigns">
            <ProfilePageCampaigns />
          </div>
        </Collapse>
      </section>
    </>
  );
};

export default ProfilePage;
