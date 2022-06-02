import React from 'react';
import {getYoutubeId} from "../../../utils/utils";

function YoutubeComponent({className, link}) {
    const youtubeId = getYoutubeId(link)

    return (
        <iframe
            className={className}
            title='youtube video'
            src={`https://www.youtube.com/embed/${youtubeId}`}
            frameBorder="0"
            allowFullScreen
        />
    );
}

export default YoutubeComponent;