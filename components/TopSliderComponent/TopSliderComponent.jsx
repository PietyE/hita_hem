import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { sanitizeHtmlFromBack } from "utils/sanitazeHTML";
import Button from "../ui/Button";
import StatusCompanyBadge from "../StatusCompany";
import Image from 'next/image'
import {checkCurrentResolution, getCorrectImage} from "../../utils/utils";

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
    type
}) => {
  const screenSize = checkCurrentResolution()

  return (
    <div className={`slider_component_container ${sectionClass}`}>
      <Carousel controls={data?.length>1} slide={true} interval={8000} touch={true} indicators={data?.length>1}>
        {!!data?.length &&
          data?.map((headerItem) => {
            const {
              images,
              title,
              description,
              first_button_title,
              second_button_title,
              first_button_url,
              second_button_url,
              status,
                pk,
                percentage,
            } = headerItem;
            const img = getCorrectImage(images)
            return (
              <Carousel.Item key={pk+title}>
                <div className='item_component_container' style={{  position: 'relative'}}>
                  {/*{( screenSize === 'desktop' && img &&*/}
                  {/*    <Image*/}
                  {/*    src = {img}*/}
                  {/*    layout = "fill"*/}
                  {/*    objectFit = "cover"*/}
                  {/*    priority = {true}*/}
                  {/*    alt = 'header image'*/}

                  {/*/>)}*/}
                  {/*{( screenSize === 'laptop' && img &&*/}
                  {/*    <Image*/}
                  {/*        src = {img}*/}
                  {/*        layout = "fill"*/}
                  {/*        objectFit = "cover"*/}
                  {/*        priority = {true}*/}
                  {/*        alt = 'header image'*/}

                  {/*    />)}*/}
                  {/*{( screenSize === 'mobile' && img &&*/}
                  {/*    <Image*/}
                  {/*        src = {img}*/}
                  {/*        layout = "fill"*/}
                  {/*        objectFit = "cover"*/}
                  {/*        priority = {true}*/}
                  {/*        alt = 'header image'*/}

                  {/*    />)}*/}
                  <div className= {`item_component_content_container ${containerClass}`}>
                    {status && (
                        <StatusCompanyBadge
                            status={status}
                            percentage={percentage}
                            classNameContainer={`item_component_status ${statusClass}`}
                        />
                    )}
                    {title && type === 'home_page' && (
                        <h1 className={`item_component_title ${itemTitleClass}`}>
                          {title}
                        </h1>
                    )}
                    {title && type !== 'home_page' && (
                        <h2 className={`item_component_title ${itemTitleClass}`}>
                          {title}
                        </h2>
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
                                  {first_button_title.toUpperCase()}
                                </Button>
                              </a>
                          )}
                          {second_button_title && (
                              <a href={second_button_url}>
                                <Button
                                    className={`slider_component_second_btn ${secondButtonClass}`}
                                    colorStyle="outline-white"
                                >
                                  {second_button_title.toUpperCase()}
                                </Button>
                              </a>
                          )}
                        </div>
                    )}
                  </div>

                  {img && (
                      <div className='item_component_image' style={{  position: 'absolute'}}>
                      {( screenSize === 'desktop' && img &&
                          <Image
                              src = {img || null}
                              layout = "fill"
                              objectFit = "cover"
                              priority = {true}
                              alt = 'header image'

                          />)}
                  {( screenSize === 'laptop' && img &&
                    <Image
                    src = {img || null}
                    layout = "fill"
                    objectFit = "cover"
                    priority = {true}
                    alt = 'header image'

                    />)}
                  {( screenSize === 'mobile' && img &&
                    <Image
                    src = {img || null}
                    layout = "fill"
                    objectFit = "cover"
                    priority = {true}
                    alt = 'header image'

                    />)}
                    </div>
                  )}

                </div>
              </Carousel.Item>
            );
          })}
      </Carousel>
    </div>
  );
};

export default TopSliderComponent;
