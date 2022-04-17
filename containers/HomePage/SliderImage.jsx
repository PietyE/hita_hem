import React from 'react';
import Image from "next/image";

const SliderImage = ({img, screenSize, alter_text}) => {
    return (
        <>
            {img && (
                <div className='item_component_image' style={{  position: 'absolute'}}>
                    {( screenSize === 'desktop' && img &&
                        <Image
                            src = {img}
                            layout = "fill"
                            objectFit = "cover"
                            priority = {true}
                            alt = {alter_text || ' '}

                        />)}
                    {( screenSize === 'laptop' && img &&
                        <Image
                            src = {img}
                            layout = "fill"
                            objectFit = "cover"
                            priority = {true}
                            alt = {alter_text || ' '}

                        />)}
                    {( screenSize === 'mobile' && img &&
                        <Image
                            src = {img}
                            layout = "fill"
                            objectFit = "cover"
                            priority = {true}
                            alt = {alter_text || ' '}

                        />)}
                </div>
            )}
            </>
    );
}

export default SliderImage;