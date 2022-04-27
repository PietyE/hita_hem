import React from "react";
import IdeaItem from "./IdeaItem";
import {useSelector} from "react-redux";
import isEqual from "lodash/isEqual";
import {getIdeaSectionContentSelector} from "redux/reducers/companies";
import {useTranslation} from "react-i18next";

const Idea = () => {
    const {t} = useTranslation();

    const ideaContents = useSelector(getIdeaSectionContentSelector, isEqual) || [];

    return (
        <div className="idea_section_container">
            <h2 className='team_title'>{t("tab_accordion.Idea")}</h2>

            {ideaContents.map((section, i) => {
                return (
                    <IdeaItem key={i} section={section}/>
                )
            })}
        </div>
    );
};

export default Idea;
