import React from "react";
import {useSelector} from "react-redux";

import ImageComponent from "components/ui/ImageComponent";
import {
    getRaisePagePlatformAdvantagesTitleSelector,
    getRaisePagePlatformSelector,
} from "redux/reducers/raisePage";
import Image from "next/image";

const RaiseAdvantages = () => {
    const title = useSelector(getRaisePagePlatformAdvantagesTitleSelector);
    const platform = useSelector(getRaisePagePlatformSelector);
    return (
        <>
            {!!platform?.length && (<section className="raise_advantages_container">
                <div className="raise_advantages_item">
                    {title && <h2 className="raise_advantages_title">{title}</h2>}
                </div>
                {platform.length > 0 &&
                platform.map((el, i) => {
                    return (
                        <div key={i} className="raise_advantages_item">
                            {/*<ImageComponent*/}
                            {/*    src={el?.logo}*/}
                            {/*    alt={platform?.alter_text || ' '}*/}

                            {/*    className="raise_advantages_img"*/}
                            {/*/>*/}
                            <div className="raise_advantages_img">
                                {el?.logo &&
                                <Image
                                    src={el?.logo}
                                    alt={platform?.alter_text || ' '}
                                    layout = "fill"
                                    objectFit = "cover"
                                    loading='lazy'
                                    placeholder="blur"
                                    blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8Xw8AAkMBYCz7bH0AAAAASUVORK5CYII='

                                />
                                }
                            </div>
                            <div className="raise_advantages_item_text_wrapper">
                                <h3 className="raise_advantages_item_title">{el.title}</h3>
                                <p className="raise_advantages_text">{el.description}</p>
                            </div>
                        </div>
                    );
                })}
            </section>)}
        </>
    );
};

export default RaiseAdvantages;
