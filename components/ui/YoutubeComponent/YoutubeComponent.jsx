import React, {useRef} from 'react';
import {getYoutubeId} from "../../../utils/utils";
import useIntersectionObserver from '@react-hook/intersection-observer'

function YoutubeComponent({className, link}) {
    const youtubeId = getYoutubeId(link)

    const containerRef = useRef()
    const lockRef = useRef(false)
    const { isIntersecting } = useIntersectionObserver(containerRef)
    if (isIntersecting) {
        lockRef.current = true
    }
    return (
        <div
            style={{
                overflow: 'hidden',
                paddingTop: '56.25%',
                position: 'relative',
                width: '100%',
            }}
            ref={containerRef}
        >
            {lockRef.current && (
                <iframe
                    title='video'
                    style={{
                        bottom: 0,
                        height: '100%',
                        left: 0,
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        width: '100%',
                    }}
                    src={`https://www.youtube.com/embed/${youtubeId}`}
                    frameBorder="0"
                    allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen="allowfullscreen"
                ></iframe>
            )}
        </div>
    );
}

export default YoutubeComponent;