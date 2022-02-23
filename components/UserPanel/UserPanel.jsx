import React from "react";
import { useSelector } from "react-redux";
import {getIsBankIdResident, getUserSelector} from "redux/reducers/user";
import isEqual from "lodash/isEqual";
import dynamic from "next/dynamic";

import UserPanelMenu from "components/ui/UserPanelMenu";
import Image from "next/image";
import {useTranslation} from "react-i18next";

const DropDownComponent = dynamic(() =>
  import("components/ui/DropDownComponent")
);
const DropdownToggle = dynamic(() =>
  import("components/ui/DropDownComponent").then((c) => c.DropdownToggle)
);

function UserPanel() {
    const { t } = useTranslation();

    const userInfo = useSelector(getUserSelector, isEqual);
  const isBankIdResident = useSelector(getIsBankIdResident)
  const { account, user } = userInfo;

  return (
    <DropDownComponent className="user_panel_container">
      <DropdownToggle className="user_panel_toggle" as="div">
        {!!user?.first_name && !!user?.second_name && (
          <span className="user_panel_text">{`${user?.first_name} ${user?.second_name}`}</span>
        )}
          {(!user?.first_name ) && (
            <span className="user_panel_text"> {account.email}</span>
          )}

        {/*{(!user?.first_name && !isBankIdResident) && (*/}
        {/*  <span className="user_panel_text"> {account.email}</span>*/}
        {/*)}*/}
        {/*  {(!user?.first_name && isBankIdResident) && (*/}
        {/*      <span className="user_panel_text">{t("header.bank_id_user_text")}</span>*/}
        {/*  )}*/}
        <div className="user_panel_avatar_wrapper" style={{  position: 'relative'}}>
          {user?.image && (
            // <img
            //   src={user?.image}
            //   alt="avatar"
            //   className="user_panel_avatar"
            //   loading="lazy"
            // />
              <Image
                  src = {user?.image}
                  layout = "fill"
                  objectFit = "cover"
                  priority = {true}
                  alt = {user?.image ? 'avatar' : ' '}
              />
          )}
        </div>
      </DropdownToggle>
      {/* <Dropdown.Item as="div" className="user_panel_avatar_item"> */}
      <UserPanelMenu />
      {/* </Dropdown.Item> */}
    </DropDownComponent>
  );
}

export default UserPanel;
