import React from "react";
import {useSelector} from "react-redux";
import isEqual from "lodash/isEqual";

import {
    getRaisePageRaiseOpportunitiesDescriptionSelector,
    getRaisePageRaiseOpportunitiesTitleSelector,
    getRaisePageOpportunitiesSelector,
    getRaisePageExtraSelector,
    getRaisePageExtraFeaturesTitleSelector,
} from "redux/reducers/raisePage";
import Image from "next/image";

const RaiseInstructionsBlock = ({type}) => {
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
            {!!content.length && (
                <div className="raise_instructions_container">
                    {!!title && <h1 className="raise_instructions_title">{title}</h1>}
                    {!!description && (
                        <p className="raise_instructions_text">{description} </p>
                    )}
                    <ul className="raise_item-list_instructions_container">
                        {content.map((el, i) => {
                            return (
                                <li key={i} className="raise_item_container">
                                    <div className="raise_item_icon_wrapper">
                                        {el?.logo &&
                                        <Image
                                            // className="raise_item_img"
                                            layout = "fill"
                                            objectFit = "cover"
                                            src={el?.logo}
                                            alt={el?.alter_text}
                                            loading="lazy"
                                            placeholder="blur"
                                            blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8Xw8AAkMBYCz7bH0AAAAASUVORK5CYII='
                                        />
                                        }
                                    </div>
                                    <h3 className="rise_item_title">{el.title}</h3>
                                    <p className="raise_item_text">{el.description}</p>
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
