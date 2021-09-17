import React from "react";
import { useSelector } from "react-redux";
import { getUserSelector } from "redux/reducers/user";
import { isEqual } from "lodash";
import UserPanelMenu from "../ui/UserPanelMenu";
import { Dropdown } from "react-bootstrap";

function UserPanel() {
  const userInfo = useSelector(getUserSelector, isEqual);
  const { account, user } = userInfo;

  return (
    <Dropdown className="user_panel_container">
      <Dropdown.Toggle className="user_panel_toggle" as="div">
        {!!user?.first_name && !!user?.second_name && (
          <span className="user_panel_text">{`${user?.first_name} ${user?.second_name}`}</span>
        )}
        {(!user?.first_name || !user?.second_name) && (
          <span className="user_panel_text"> {account.email}</span>
        )}
        <div className="user_panel_avatar_wrapper">
          {user?.image && (
            <img src={user?.image} alt="avatar" className="user_panel_avatar" />
          )}
        </div>
      </Dropdown.Toggle>
      <Dropdown.Item as="div" className="user_panel_avatar_item">
        <UserPanelMenu />
      </Dropdown.Item>
    </Dropdown>
  );
}

export default UserPanel;
