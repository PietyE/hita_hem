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
                "name": "Om oss",
                "description": "",
                "url": "https://accumeo.com/om-oss"
            },
            {
                "@type": "ItemList",
                "itemListElement": teamMembers,
            }
        ]

    })

}

export default makeAboutUsSchema

