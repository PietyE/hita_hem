const makeHomePageSchema = (data) => {
    let title = ''
    let description = ''
    if (data?.banner_images && Array.isArray(data?.banner_images) && data?.banner_images.length > 0) {
        title = data?.banner_images[0].title
        description = data?.banner_images[0].description
    }
    return (
        {
            "@context": "http://www.schema.org",
            "@graph": [
                {
                    "@type": "Organization",
                    "@id": "https://accumeo.com/#organization",
                    "name": "Accumeo",
                    "url": "https://accumeo.com/",
                    "email":"info@accumeo.com",
                    "sameAs": [
                        "https://www.allabolag.se/what/accumeo",
                        "https://www.linkedin.com/company/accumeo/",
                        "https://twitter.com/accumeo",
                        "https://www.facebook.com/Accumeo/",
                        "https://www.instagram.com/accumeo/"
                    ],
                    "logo": {
                        "@type": "ImageObject",
                        "@id": "https://accumeo.com/#logo",
                        "url": "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
                        "caption": "Accumeo"
                    },
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
                                    "name": "Home"
                                }
                        },
                        {
                            "@type": "ListItem",
                            "position": 2,
                            "item": {
                                "@type": "WebPage",
                                "@id": "https://accumeo.com/investment-opportunities/",
                                "url": "https://accumeo.com/investment-opportunities/",
                                "name": "Investment opportunities"
                            }
                        },
                        {
                            "@type": "ListItem",
                            "position": 3,
                            "item": {
                                "@type": "WebPage",
                                "@id": "https://accumeo.com/raise/",
                                "url": "https://accumeo.com/raise/",
                                "name": "Accelerera er tillväxt och säkra finansiering"
                            }
                        },
                        {
                            "@type": "ListItem",
                            "position": 4,
                            "item": {
                                "@type": "WebPage",
                                "@id": "https://accumeo.com/news/",
                                "url": "https://accumeo.com/news/",
                                "name": "Blogg"
                            }
                        },
                        {
                            "@type": "ListItem",
                            "position": 5,
                            "item": {
                                "@type": "WebPage",
                                "@id": "https://accumeo.com/about-us/",
                                "url": "https://accumeo.com/about-us/",
                                "name": "We are Accumeo"
                            }
                        },
                    ]
                },
            ]
        }

    )

}

export default makeHomePageSchema