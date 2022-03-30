import React from "react";
import { useSelector } from "react-redux";
import isEqual from "lodash/isEqual";

import Title from "components/ui/Title";
import InfoBlockColor from "components/ui/InfoBlockColor";
import ImageComponent from "components/ui/ImageComponent";
import { getIdeaSectionContentSelector } from "redux/reducers/companies";
import { sanitizeHtmlFromBack } from "utils/sanitazeHTML";
// import Image from "next/image";
import SimpleReactLightbox from 'simple-react-lightbox'
import { SRLWrapper } from "simple-react-lightbox";

import {getCorrectImage} from "../../utils/utils";

const Idea = () => {
  const ideaContents =
    useSelector(getIdeaSectionContentSelector, isEqual) || [];

  const options = {
    buttons: {
      showDownloadButton:false,
      showAutoplayButton:false,
    },
    thumbnails: {
      thumbnailsContainerPadding: "20px 0",
    }
  }
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
                  <SimpleReactLightbox>
                  <SRLWrapper options={options}>

                  {!!img1 && (
                    <ImageComponent
                      // alt={img1 ? 'first image' : ' '}
                        alt='first image'

                        src={img1}
                      className="mb-4"
                    />
                    //     <Image
                    //         src = {img1}
                    //         width='100%'
                    //         height='60'
                    //         layout="responsive"
                    //         objectFit="contain"
                    //         alt = 'first idea photo'
                    //         className='idea_next_image'
                    //     />

                  )}
                  {!!img2 && (
                    <ImageComponent
                        // alt={img2 ? 'solution image' : ' '}
                        alt='solution image'

                        src={img2} />
                    // <Image
                    // src = {img2}
                    // width='100vw'
                    // height='60'
                    // layout="responsive"
                    // objectFit="contain"
                    // alt = 'second idea photo'
                    // className='idea_next_image'
                    // />
                  )}
                  </SRLWrapper>
                    </SimpleReactLightbox>
              )}
            </section>
            {type === "Result" && (
                <SimpleReactLightbox>
                <SRLWrapper options={options}>

                <div className="idea_image_container">

            {!!img1 && (
                   <ImageComponent
                    // alt={img1 ? 'idea image' : ' '}
                    alt='idea image'

                    src={img1}
                    className="middle_foto"
                  />
                  //   <div className="middle_foto"  style={{  position: 'relative',}}>
                  //     <Image
                  //         src = {img1}
                  //         width='100%'
                  //         height='56%'
                  //         layout = "responsive"
                  //         objectFit = "cover"
                  //         alt = 'first photo'
                  //         className="middle_foto"
                  //     />
                  //   </div>
                )}
                {!!img2 && (
                  <ImageComponent
                    // alt={img2 ? 'idea image 2' : ' '}
                      alt='idea image 2'

                      src={img2}
                    className="middle_foto"
                  />
                  //   <div className="middle_foto"  style={{  position: 'relative',}}>
                  //     <Image
                  //         src = {img2}
                  //         width='100%'
                  //         height='56%'
                  //         layout = "responsive"
                  //         objectFit = "cover"
                  //         alt = 'second photo'
                  //         className="middle_foto"
                  //     />
                  //   </div>
                )}
                {!!img3 && (
                  <ImageComponent
                    // alt={img3 ? 'idea image 3' : ' '}
                      alt='idea image 3'

                      src={img3}
                    className="middle_foto"
                  />
                  //   <div className="middle_foto"  style={{  position: 'relative',}}>
                  //     <Image
                  //         src = {img3}
                  //         width='100%'
                  //         height='56%'
                  //         layout = "responsive"
                  //         objectFit = "cover"
                  //         alt = 'third photo'
                  //         className="middle_foto"
                  //     />
                  //   </div>
                )}
                {!!img4 && (
                  <ImageComponent
                    // alt={img4 ? 'idea image 4' : ' '}
                      alt='idea image 4'

                      src={img4}
                    className="middle_foto"
                  />

                      // <div className="middle_foto"  style={{  position: 'relative',}}>
                      //   <Image
                      //       src = {img4}
                      //       width='100%'
                      //       height='56%'
                      //       layout = "responsive"
                      //       objectFit = "cover"
                      //       alt = 'fourth idea photo'
                      //   />
                      // </div>
                )}

              </div>
              </SRLWrapper>
                  </SimpleReactLightbox>

              )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Idea;
