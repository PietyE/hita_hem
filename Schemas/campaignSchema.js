import {convertStatusToText} from "../utils/utils";

const makeCampaignSchema = (campaign) => {
    let socials = []
    if(campaign?.social_url && campaign?.social_url.length > 0){
        socials = campaign?.social_url.map(el=>el.url)
    }

    return (campaign?.hidden_mode ? {}
        :
        {
            "@context": "https://schema.org/",
            "@graph": [
                {
                    "@type": "Organization",
                    "name": `${campaign?.name}`,
                    "description": `${campaign?.short_description}`,
                    "logo": {
                        "@type": "ImageObject",
                        "url": `${campaign?.logo}`,
                        "caption": `${campaign?.name}`
                    },
                    "image": {
                        "@type": "ImageObject",
                        "url":  `${campaign?.images['desktop'] || campaign?.images['laptop'] || campaign?.images['mobile']}`,
                        "caption": `${campaign?.name}`
                    },
                    "url": `https://accumeo.com/foretag/${campaign?.slug}`,
                    "sameAs": socials,
                },
                {
                    "@type": "Offer",
                    "name": `${campaign?.name}`,
                    "areaServed": `${campaign?.country}`,
                    "description": `${campaign?.short_description}`,

                    "availability": `${convertStatusToText(campaign?.status)}`,
                    "availabilityEnds": `${campaign?.end_date}`,
                    "availabilityStarts": `${campaign?.start_date}`,
                    "priceCurrency": `${campaign?.currency}`,

                }
                ]

        })

}

export default makeCampaignSchema;



