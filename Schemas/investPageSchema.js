const makeInvestPageSchema = (campaigns) => {

    let listForSchema = []

    if(campaigns && campaigns.length > 0){
        listForSchema = campaigns.map((el, i) => ({
            "@type":"ListItem",
            "isPartOf": {"@id": "https://accumeo.com/investeringsmojligheter/#webpage"},
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
                "@id": "https://accumeo.com/investeringsmojligheter/#webpage",
                "url": "https://accumeo.com/investeringsmojligheter",
                "name": "Investeringsmöjligheter",
                "description": "Här kan du se vilka företag som ligger ute på plattformen",

            },
            {
                "@type":"ItemList",
                "itemListElement":listForSchema,
            }
        ]

    })
}

export default makeInvestPageSchema