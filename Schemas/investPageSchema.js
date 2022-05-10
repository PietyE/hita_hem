const makeInvestPageSchema = (campaigns) => {

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