import React from 'react'
import { useSelector } from 'react-redux'
import { isEqual } from 'lodash'

import Title from 'components/ui/Title'
import InfoBlockColor from 'components/ui/InfoBlockColor'
import ImageComponent from 'components/ui/ImageComponent'
import { getIdeaSectionContentSelector } from 'redux/reducers/companies'
import { sanitizeHtmlFromBack } from 'utils/sanitazeHTML'

const Idea = () => {
  const ideaContents = useSelector(getIdeaSectionContentSelector, isEqual) || []
  return (
    <div className="idea_section_container">
      {ideaContents.map((section, i) => {
        const {
          type,
          first_image,
          second_image,
          third_image,
          fourth_image,
          title,
          description,
        } = section

        if (type === 'Challenge') {
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
          )
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
              {type === 'Solution' && (
                <>
                  {!!first_image && (
                    <ImageComponent
                      alt="foto1"
                      src={first_image}
                      className="mb-4"
                    />
                  )}
                  {!!second_image && (
                    <ImageComponent alt="foto1" src={second_image} />
                  )}
                </>
              )}
            </section>
            {type === 'Result' && (
              <div className="idea_image_container">
                {!!first_image && (
                  <ImageComponent
                    alt="foto1"
                    src={first_image}
                    className="middle_foto"
                  />
                )}
                {!!second_image && (
                  <ImageComponent
                    alt="foto1"
                    src={second_image}
                    className="middle_foto"
                  />
                )}
                {!!third_image && (
                  <ImageComponent
                    alt="foto1"
                    src={third_image}
                    className="middle_foto"
                  />
                )}
                {!!fourth_image && (
                  <ImageComponent
                    alt="foto1"
                    src={fourth_image}
                    className="middle_foto"
                  />
                )}
              </div>
            )}
          </React.Fragment>
        )
      })}
    </div>

  )
}

export default Idea
