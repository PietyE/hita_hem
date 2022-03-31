import React from 'react';
import Image from "next/image";

const SliderImage = ({img, screenSize}) => {
    return (
        <>
            {img && (
                <div className='item_component_image' style={{  position: 'absolute'}}>
                    {( screenSize === 'desktop' && img &&
                        <Image
                            src = {img || null}
                            layout = "fill"
                            objectFit = "cover"
                            priority = {true}
                            alt = {img ? 'header image' : ' '}

                        />)}
                    {( screenSize === 'laptop' && img &&
                        <Image
                            src = {img || null}
                            layout = "fill"
                            objectFit = "cover"
                            priority = {true}
                            alt = {img ? 'header image' : ' '}

                        />)}
                    {( screenSize === 'mobile' && img &&
                        <Image
                            src = {img || null}
                            layout = "fill"
                            objectFit = "cover"
                            priority = {true}
                            alt = {img ? 'header image' : ' '}

                        />)}
                </div>
            )}
            </>
    );
}

export default SliderImage;