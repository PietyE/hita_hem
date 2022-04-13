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
        "@type":"ItemList",
        "itemListElement":listForSchema,
    })
}

export default makeInvestPageSchema