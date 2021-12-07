import React from "react";
import { useSelector } from "react-redux";
import isEqual from "lodash/isEqual";

import Title from "components/ui/Title";
import InfoBlockColor from "components/ui/InfoBlockColor";
import ImageComponent from "components/ui/ImageComponent";
import { getIdeaSectionContentSelector } from "redux/reducers/companies";
import { sanitizeHtmlFromBack } from "utils/sanitazeHTML";
import Image from "next/image";
import {getCorrectImage} from "../../utils/utils";

const Idea = () => {
  const ideaContents =
    useSelector(getIdeaSectionContentSelector, isEqual) || [];
  return (
    <div className="idea_section_container">
      {ideaContents.map((section, i) => {
        const {
          type,
          first_images,
          second_images,
          third_images,
          fourth_images,
          title,
          description,
        } = section;

        const img1 = getCorrectImage(first_images)
        const img2 = getCorrectImage(second_images)
        const img3= getCorrectImage(third_images)
        const img4 = getCorrectImage(fourth_images)

        if (type === "Challenge") {
          return (
            <section key={i} className="idea_section mb-5">
              <InfoBlockColor className="idea_color_block">
                <Title title={title} className="mb-3" />
                <span
                  className="idea_section_description_container"
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtmlFromBack(description),
                  }}
                />
              </InfoBlockColor>
            </section>
          );
        }

        return (
          <React.Fragment key={i}>
            <section className="idea_section mb-5">
              <Title title={title} className="idea_title" />
              <span
                className="idea_section_description_container"
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtmlFromBack(description),
                }}
              />
              {type === "Solution" && (
                <>
                  {!!img1 && (
                    <ImageComponent
                      alt="foto1"
                      src={img1}
                      className="mb-4"
                    />

                  )}
                  {!!img2 && (
                    <ImageComponent alt="foto1" src={img2} />

                  )}
                </>
              )}
            </section>
            {type === "Result" && (
              <div className="idea_image_container">
                {!!img1 && (
                   <ImageComponent
                    alt="foto1"
                    src={img1}
                    className="middle_foto"
                  />

                )}
                {!!img2 && (
                  <ImageComponent
                    alt="foto1"
                    src={img2}
                    className="middle_foto"
                  />

                )}
                {!!img3 && (
                  <ImageComponent
                    alt="foto1"
                    src={img3}
                    className="middle_foto"
                  />

                )}
                {!!img4 && (
                  <ImageComponent
                    alt="foto1"
                    src={img4}
                    className="middle_foto"
                  />

                )}
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Idea;
