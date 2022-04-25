import React from "react";
import {useSelector} from "react-redux";
import isEqual from "lodash/isEqual";

import TeamMemberCard from "./TeamMemberCard";

import {getTeatMateSetSelector} from "redux/reducers/companies";
import {useTranslation} from "react-i18next";

const Team = () => {
    const {t} = useTranslation();
    const teamsMateSet = useSelector(getTeatMateSetSelector, isEqual) || [];

    return (
        <>
            <h2 className='team_title'>{t("tab_accordion.Team")}</h2>

            <div className="team_section_container">
            {teamsMateSet?.length > 0 &&
            teamsMateSet?.map((member, index) => (
                <TeamMemberCard key={index} item={member}/>
            ))}
        </div>
            </>
    );
};

export default Team;
