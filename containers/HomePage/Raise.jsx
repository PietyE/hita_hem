import React from "react";
import { useSelector } from "react-redux";
import { getHomePageRaisesSelector } from "redux/reducers/homePage";
import isEqual from "lodash/isEqual";
import { sanitizeHtmlFromBack } from "utils/sanitazeHTML";

function Raise() {
  const homePageRaise = useSelector(getHomePageRaisesSelector, isEqual) || [];

  return (
    <div className="raise_instruction_container">
      {!!homePageRaise &&
        homePageRaise.map((el) => {
          const { index, logo, title, description } = el;
          return (
            <div key={index} className="raise_step step1">
              <div className="step_icon_wrapper">
                <img
                  src={logo}
                  alt={logo ? 'step icon' : ' '}
                  className="raise_step_icon"
                  loading="lazy"
                />
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

export default Raise;
