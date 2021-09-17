import React from "react";
import { useSelector } from "react-redux";
import { isEqual } from "lodash";

import {
  getRaisePageRaiseOpportunitiesDescriptionSelector,
  getRaisePageRaiseOpportunitiesTitleSelector,
  getRaisePageOpportunitiesSelector,
  getRaisePageExtraSelector,
  getRaisePageExtraFeaturesTitleSelector,
} from "redux/reducers/raisePage";

const RaiseInstructionsBlock = ({ type }) => {
  const opportunitiesDescription = useSelector(
    getRaisePageRaiseOpportunitiesDescriptionSelector
  );
  const opportunitiesTitle = useSelector(
    getRaisePageRaiseOpportunitiesTitleSelector
  );
  const opportunities = useSelector(getRaisePageOpportunitiesSelector, isEqual);
  const extraDescription = useSelector(
    getRaisePageRaiseOpportunitiesDescriptionSelector
  );
  const extraTitle = useSelector(getRaisePageExtraFeaturesTitleSelector);
  const extra = useSelector(getRaisePageExtraSelector, isEqual);

  const content = type === "opportunities" ? opportunities : extra;
  const title = type === "opportunities" ? opportunitiesTitle : extraTitle;
  const description =
    type === "opportunities" ? opportunitiesDescription : extraDescription;

  return (
    <>
      {content.length > 0 && (
        <div className="raise_instructions_container">
          {title && <h2 className="raise_instructions_title">{title}</h2>}
          {description && (
            <p className="raise_instructions_text">{description} </p>
          )}
          <ul className="raise_item-list_instructions_container">
            {content.map((el, i) => {
              return (
                <li key={i} className="raise_item_container">
                  <div className="raise_item_icon_wrapper">
                    <img className="raise_item_img" src={el.logo} alt="" />
                  </div>
                  <h3 className="rise_item_title">{el.title}</h3>
                  <p className="raise_item_text">{el.description} </p>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default RaiseInstructionsBlock;
