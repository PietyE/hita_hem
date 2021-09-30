import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

const DropDownComponent = ({ children, ...extra }) => {
  return <Dropdown {...extra}>{children}</Dropdown>;
};

export const DropdownMenu = ({ children, ...extra }) => {
  return <Dropdown.Menu {...extra}>{children}</Dropdown.Menu>;
};

export const DropdownToggle = ({ children, ...extra }) => {
  return <Dropdown.Toggle {...extra}>{children}</Dropdown.Toggle>;
};

export const DropdownItem = ({ children, ...extra }) => {
  return <Dropdown.Item {...extra}>{children}</Dropdown.Item>;
};

export default DropDownComponent;
