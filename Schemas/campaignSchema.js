const makeCampaignSchema = (campaign) => {
    let socials = []
    if(campaign?.social_url && campaign?.social_url.length > 0){
        socials = campaign?.social_url.map(el=>el.url)
    }

    return (campaign?.hidden_mode ? {}
        :
        {
            "@context": "https://schema.org/",
            "@type": "Organization",
            "name": `${campaign?.name}`,
            "description": `${campaign?.short_description}`,
            "logo": {
                "url": `${campaign?.logo}`,
                "@context": "http://schema.org",
                "@type": "ImageObject"
            },
            "image": `${campaign?.images['desktop'] || campaign?.images['laptop'] || campaign?.images['mobile']}`,
            "url": `https://accumeo.com/foretag/${campaign?.slug}`,
            "address": {
                "@type": "PostalAddress",
                "addressLocality": `${campaign?.country}`,
            },
            "sameAs": socials,
        })

}

export default makeCampaignSchema;



