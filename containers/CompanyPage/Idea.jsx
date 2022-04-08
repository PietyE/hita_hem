import React from "react";
import IdeaItem from "./IdeaItem";
import {useSelector} from "react-redux";
import isEqual from "lodash/isEqual";
import {getIdeaSectionContentSelector} from "redux/reducers/companies";

const Idea = () => {
    const ideaContents = useSelector(getIdeaSectionContentSelector, isEqual) || [];

    return (
        <div className="idea_section_container">
            {ideaContents.map((section, i) => {
                return (
                    <IdeaItem key={i} section={section}/>
                )
            })}
        </div>
    );
};

export default Idea;
