import React from "react";
import {convertStatusToText} from "utils/utils";
import {useSelector} from "react-redux";
import {getSelectedLangSelector} from "../../redux/reducers/language";

const StatusCompanyBadge = (props) => {
    const language = useSelector(getSelectedLangSelector)
    const { status = "", classNameContainer } = props;
     const _status = convertStatusToText(status, language)
  return (
    <div className={`status status${status} ${classNameContainer}`}>
      <span className={`status${status}`}>{_status}</span>
    </div>
  );
};

export default StatusCompanyBadge;
