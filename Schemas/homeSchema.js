const makeHomePageSchema = (data) => {
    let title = data?.title
    let description = data?.description

    return (
        {
            "@context": "http://www.schema.org",
            "@graph": [
                {
                    "@type": "Organization",
                    "@id": "https://accumeo.com/#organization",
                    "name": "Accumeo",
                    "url": "https://accumeo.com/",
                    "email": "info@accumeo.com",
                    "sameAs": [
                        "https://www.allabolag.se/what/accumeo",
                        "https://www.linkedin.com/company/accumeo/",
                        "https://twitter.com/accumeo",
                        "https://www.facebook.com/Accumeo/",
                        "https://www.instagram.com/accumeo/"
                    ],
                },
                {
                    "@type": "WebSite",
                    "@id": "https://accumeo.com/#website",
                    "url": "https://accumeo.com/",
                    "name": "Accumeo",
                    "publisher": {"@id": "https://accumeo.com/#organization"},
                },
                {
                    "@type": "WebPage",
                    "@id": "https://accumeo.com/#webpage",
                    "url": "https://accumeo.com/",
                    "name": `${title}`,
                    "isPartOf": {"@id": "https://accumeo.com/#website"},
                    "description": `${description}`,
                    "breadcrumb": {"@id": "https://accumeo.com/#breadcrumb"}
                },
                {
                    "@type": "BreadcrumbList",
                    "@id": "https://accumeo.com/#breadcrumb",
                    "itemListElement": [
                        {
                            "@type": "ListItem",
                            "position": 1,
                            "item":
                                {
                                    "@type": "WebPage",
                                    "@id": "https://accumeo.com/",
                                    "url": "https://accumeo.com/",
                                    "name": "Hemsida"
                                }
                        },
                        {
                            "@type": "ListItem",
                            "position": 2,
                            "item": {
                                "@type": "WebPage",
                                "@id": "https://accumeo.com/investeringsmojligheter",
                                "url": "https://accumeo.com/investeringsmojligheter",
                                "name": "Investeringsmojligheter"
                            }
                        },
                        {
                            "@type": "ListItem",
                            "position": 3,
                            "item": {
                                "@type": "WebPage",
                                "@id": "https://accumeo.com/sok-kapital",
                                "url": "https://accumeo.com/sok-kapital",
                                "name": "Sök kapital"
                            }
                        },
                        {
                            "@type": "ListItem",
                            "position": 4,
                            "item": {
                                "@type": "WebPage",
                                "@id": "https://accumeo.com/nyheter",
                                "url": "https://accumeo.com/nyheter",
                                "name": "Blogg"
                            }
                        },
                        {
                            "@type": "ListItem",
                            "position": 5,
                            "item": {
                                "@type": "WebPage",
                                "@id": "https://accumeo.com/om-oss",
                                "url": "https://accumeo.com/om-oss",
                                "name": "Om oss"
                            }
                        },
                    ]
                },
            ]
        }

    )

}

export default makeHomePageSchema