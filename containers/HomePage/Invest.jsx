import React from "react";
import {useSelector} from "react-redux";
import {getHomePageInvestSelector} from "redux/reducers/homePage";
import isEqual from "lodash/isEqual";
import {sanitizeHtmlFromBack} from "utils/sanitazeHTML";
import Image from "next/image";

function Invest() {
    const homePageInvest = useSelector(getHomePageInvestSelector, isEqual) || [];
    return (
        <div className="raise_instruction_container">
            {!!homePageInvest &&
            homePageInvest.map((el) => {
                const {index, logo, title, description} = el;
                return (
                    <div key={title} className="raise_step step1">
                        <div className="step_icon_wrapper">
                            {logo && (
                                <Image
                                    src={logo}
                                    alt={homePageInvest?.alter_text || 'image'}
                                    className="raise_step_icon"
                                    layout='fill'
                                    objectFit="cover"
                                    loading="lazy"
                                />
                            )}
                        </div>
                        <div className="raise_step_text_wrapper">
                            <h3 className="raise_step_title">
                                <span className="raise_step_title_accent">0{index}</span>
                                {title}
                            </h3>
                            <div
                                className="raise_step_text"
                                dangerouslySetInnerHTML={{
                                    __html: sanitizeHtmlFromBack(description),
                                }}
                            ></div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Invest;
