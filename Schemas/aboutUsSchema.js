const makeAboutUsSchema = (data) => {
    const teamMembers = data?.map((member) => (
            {
                "@type": "ListItem",
                "position": `${member.index}`,
                "item": {
                    "@type": "Person",
                    "name": `${member.name}`,
                    "jobTitle": `${member.position}`,
                    "email": `${member.email}`,
                    "description": `${member.description}`,
                    "image": {
                        "@type": "ImageObject",
                        "url": `${member.photo}`,
                        "caption": `${member.name}`
                    }
                }
            }
        )
    )
    return ({
        "@context": "http://schema.org/",
        "@graph": [
            {
                "@type": "AboutPage",
                "name": "We are Accumeo",
                "description": "Above all, Accumeo stands for innovation and growth. Our experience allows us to focus on the unserved gap between entrepreneurial vision and investor access, and to bridge that gap with a platform optimised for both entrepreneurs and investors. Our management team draws on years of experience with start-ups and finance, and our board of directors offers almost a century worth of perspective on both crowdfunding and traditional corporate finance.",
                "url": "https://accumeo.com/about-us"
            },
            {
                "@type": "ItemList",
                "itemListElement": teamMembers,
            }
        ]

    })

}

export default makeAboutUsSchema

