import React from "react";
import { useSelector } from "react-redux";
import { getUserSelector } from "redux/reducers/user";
import isEqual from "lodash/isEqual";
import dynamic from "next/dynamic";

import UserPanelMenu from "components/ui/UserPanelMenu";

const DropDownComponent = dynamic(() =>
  import("components/ui/DropDownComponent")
);
const DropdownToggle = dynamic(() =>
  import("components/ui/DropDownComponent").then((c) => c.DropdownToggle)
);

function UserPanel() {
  const userInfo = useSelector(getUserSelector, isEqual);
  const { account, user } = userInfo;

  return (
    <DropDownComponent className="user_panel_container">
      <DropdownToggle className="user_panel_toggle" as="div">
        {!!user?.first_name && !!user?.second_name && (
          <span className="user_panel_text">{`${user?.first_name} ${user?.second_name}`}</span>
        )}
        {(!user?.first_name || !user?.second_name) && (
          <span className="user_panel_text"> {account.email}</span>
        )}
        <div className="user_panel_avatar_wrapper">
          {user?.image && (
            <img
              src={user?.image}
              alt="avatar"
              className="user_panel_avatar"
              loading="lazy"
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
