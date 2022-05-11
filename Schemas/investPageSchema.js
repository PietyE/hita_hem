const makeInvestPageSchema = ({campaigns, seo}) => {

    let listForSchema = []

    if(campaigns && campaigns.length > 0){
        listForSchema = campaigns.map((el, i) => ({
            "@type":"ListItem",
            "position":`${i}`,
            "url":`https://accumeo.com/foretag/${el.slug}`
            })
        )
    }


    return({
        "@context":"https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "url": "https://accumeo.com/investeringsmojligheter",
                "name": `${seo?.title}`,
                "description": `${seo?.description}`,
                "@id": "https://accumeo.com/investeringsmojligheter/#webpage",
            },
            {
                "@type":"ItemList",
                "itemListElement":listForSchema,
                "isPartOf": {"@id": "https://accumeo.com/investeringsmojligheter/#webpage"},
            }
        ]

    })
}

export default makeInvestPageSchema