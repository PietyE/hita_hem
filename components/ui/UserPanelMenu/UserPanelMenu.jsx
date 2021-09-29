import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import iconLogOut from "./images/logOut.svg";
import { logOut, setActiveTab } from "redux/actions/user";
import { getUserIdSelector } from "redux/reducers/user";

import { DropdownItem, DropdownMenu } from "components/ui/DropDownComponent";

const UserPanelMenu = ({ show }) => {
  const dispatch = useDispatch();
  const history = useRouter();
  const { t } = useTranslation();

  const userId = useSelector(getUserIdSelector);

  const _logOut = useCallback(() => {
    dispatch(logOut());
  }, [dispatch]);

  const _setActiveTab = useCallback(
    (data) => {
      dispatch(setActiveTab(data));
    },
    [dispatch]
  );

  const handleSelect = (tab) => {
    if (tab === "log_out") {
      _logOut();
      return;
    }
    _setActiveTab(tab);
    history.push(`/users/${userId}/profile`);
  };

  return (
    <DropdownMenu show={show} drop="down" className="user_menu">
      <DropdownItem
        eventKey="investment"
        className="user_menu_item"
        onSelect={handleSelect}
      >
        <span>{t("header.user_panel.Investments")}</span>
      </DropdownItem>
      <DropdownItem
        eventKey="personal_details"
        className="user_menu_item"
        onSelect={handleSelect}
      >
        <span>{t("header.user_panel.Personal_details")}</span>
      </DropdownItem>
      <DropdownItem
        eventKey="account_settings"
        className="user_menu_item"
        onSelect={handleSelect}
      >
        <span>{t("header.user_panel.Account_settings")}</span>
      </DropdownItem>
      <DropdownItem
        eventKey="campaigns"
        className="user_menu_item"
        onSelect={handleSelect}
      >
        <span>{t("header.user_panel.Campaigns")}</span>
      </DropdownItem>
      <DropdownItem
        eventKey="log_out"
        className="user_menu_item user_menu_item_logout"
        onSelect={handleSelect}
      >
        <span>
          <Image src={iconLogOut} alt="logout icon" />
          {t("header.user_panel.Log_Out")}
        </span>
      </DropdownItem>
    </DropdownMenu>
  );
};

export default UserPanelMenu;
