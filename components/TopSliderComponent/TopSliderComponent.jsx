import React from "react";
import uniqueId from "lodash/uniqueId";
import Carousel from "react-bootstrap/Carousel";
import { sanitizeHtmlFromBack } from "utils/sanitazeHTML";
import Button from "../ui/Button";
import StatusCompanyBadge from "../StatusCompany";

import { chooseCorrectResolution } from "../../utils/utils";

const TopSliderComponent = ({
  data,
  sectionClass,
  containerClass,
  statusClass,
  itemTitleClass,
  itemDescriptionClass,
  buttonsContainerClass,
  firstButtonClass,
  secondButtonClass,
}) => {
  return (
    <div className={`slider_component_container ${sectionClass}`}>
      <Carousel controls={data?.length>1} slide={true} interval={8000} touch={true} indicators={data?.length>1}>
        {!!data?.length &&
          data?.map((headerItem) => {
            const {
              image_list,
              image,
              title,
              description,
              first_button_title,
              second_button_title,
              first_button_url,
              second_button_url,
              status,
            } = headerItem;
            const correct_image = chooseCorrectResolution(image_list);

            const _src = correct_image || image;

            return (
              <Carousel.Item key={uniqueId()}>
                <div className='item_component_container'>
                  <img
                    className="item_component_image"
                    src={_src}
                    alt="First slide"
                    loading="lazy"
                  />
                  <div className= {`item_component_content_container ${containerClass}`}>
                  {status && (
                    <StatusCompanyBadge
                      status={status}
                      classNameContainer={`item_component_status ${statusClass}`}
                    />
                  )}
                  {title && (
                    <h3 className={`item_component_title ${itemTitleClass}`}>
                      {title}
                    </h3>
                  )}
                  {description && (
                    <div
                      className={`item_component_description ${itemDescriptionClass}`}
                      dangerouslySetInnerHTML={{
                        __html: sanitizeHtmlFromBack(description),
                      }}
                    />
                  )}
                  {(first_button_title || second_button_title) && (
                    <div
                      className={`slider_component_buttons_container ${buttonsContainerClass}`}
                    >
                      {first_button_title && (
                        <a href={first_button_url}>
                          <Button
                            className={`slider_component_first_btn ${firstButtonClass}`}
                            colorStyle="white"
                          >
                            {first_button_title}
                          </Button>
                        </a>
                      )}
                      {second_button_title && (
                        <a href={second_button_url}>
                          <Button
                            className={`slider_component_second_btn ${secondButtonClass}`}
                            colorStyle="outline-white"
                          >
                            {second_button_title}
                          </Button>
                        </a>
                      )}
                    </div>
                  )}
                  </div>
                </div>
              </Carousel.Item>
            );
          })}
      </Carousel>
    </div>
  );
};

export default TopSliderComponent;
