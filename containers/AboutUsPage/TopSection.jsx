import React from "react";
import Image from "next/image";
import {checkCurrentResolution, getCorrectImage} from "../../utils/utils";

const TopSection = ({ content = {} }) => {
  const screenSize = checkCurrentResolution()
    const img = getCorrectImage(content?.images)
  return (
    <>
        <div className="top_section" style={{position: 'relative'}}>
          <div className='top_section_content_container'>
            <h1 className="top_section_title">{content?.title}</h1>
            <span className="top_section_description">{content?.description}</span>
          </div>
          <div className='backgroung_pic' style={{position: 'aboslut'}}>
            {screenSize === 'desktop' && img &&(<Image
                src = {img}
                layout = "fill"
                objectFit = "cover"
                priority = {true}
                alt = {img ? 'photo' : ' '}
                className = "backgroung_pic"
            />)}
            {screenSize === 'laptop'&& img &&(
                <Image
                    src = {img}
                    layout = "fill"
                    objectFit = "cover"
                    priority = {true}
                    alt = {img ? 'photo' : ' '}
                    className = "backgroung_pic"
                />)}
            {screenSize === 'mobile' && img &&(
                <Image
                    src = {img}
                    layout = "fill"
                    objectFit = "cover"
                    priority = {true}
                    alt = {img ? 'photo' : ' '}
                    className = "backgroung_pic"
                />)}
          </div>


        </div>
    </>
  );
};

export default TopSection;
