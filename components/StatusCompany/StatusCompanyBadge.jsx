import React from "react";
import {convertStatusToText} from "utils/utils";
import {useSelector} from "react-redux";
import {getSelectedLangSelector} from "../../redux/reducers/language";

const StatusCompanyBadge = (props) => {
    const language = useSelector(getSelectedLangSelector)
    const { status = "", classNameContainer, percentage='' } = props;
    const _status = convertStatusToText(status, language)
    let statusStyle = `status${status}`
    if(Number(status) === 3){
        statusStyle = percentage >= 100 ? 'status3_1' : 'status3'
    }
    return (
    <div className={`status ${statusStyle} ${classNameContainer}`}>
      <span className={`status${status}`}>{_status}</span>
    </div>
  );
};

export default StatusCompanyBadge;
