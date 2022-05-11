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
                "description": "Här kan du låtar dig mer om Accumeo, vårt uppdrag och vårt team",
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

