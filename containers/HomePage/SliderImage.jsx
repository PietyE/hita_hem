import React from 'react';
import Image from "next/image";

const SliderImage = ({img, screenSize, alter_text, loading}) => {
    return (
        <>
            {img && (
                <div className='item_component_image' style={{  position: 'absolute'}}>
                    {( screenSize === 'desktop' && img &&
                        <Image
                            src = {img}
                            layout = "fill"
                            objectFit = "cover"
                            alt = {alter_text || ' '}
                            loading={loading}

                        />)}
                    {( screenSize === 'laptop' && img &&
                        <Image
                            src = {img}
                            layout = "fill"
                            objectFit = "cover"
                            alt = {alter_text || ' '}
                            loading={loading}
                        />)}
                    {( screenSize === 'mobile' && img &&
                        <Image
                            src = {img}
                            layout = "fill"
                            objectFit = "cover"
                            alt = {alter_text || ' '}
                            loading={loading}
                        />)}
                </div>
            )}
            </>
    );
}

export default SliderImage;