const makeAboutUsSchema = ({seo, team}) => {
    const teamMembers = team?.map((member) => (
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
                "name": `${seo.title}`,
                "description": `${seo.description}`,
                "url": "https://accumeo.com/om-oss",
                "@id": "https://accumeo.com/om-oss/#webpage",
            },
            {
                "@type": "ItemList",
                "itemListElement": teamMembers,
                "isPartOf": {"@id": "https://accumeo.com/om-oss/#webpage"},
            }
        ]

    })

}

export default makeAboutUsSchema

