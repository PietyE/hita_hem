import {CountryDropdown} from "react-country-region-selector";
import React from "react";

const CountryDropdownComponent = ({ children, ...extra }) => {
    return <CountryDropdown {...extra}>{children}</CountryDropdown>;
};


export default CountryDropdownComponent;