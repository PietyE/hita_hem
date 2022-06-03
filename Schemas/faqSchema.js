const makeFaqSchema = ({categories, seo}) => {
    let listOfCategories = []


    if (categories && categories.length > 0) {
        listOfCategories = categories.map((el, i) => ({
                "@type": "ListItem",
                "position": `${i}`,
                "name": `${el.title}`
            })
        )
    }

    return ({
        "@context": "http://schema.org/",
        "@graph": [
            {
                "@type": "QAPage",
                "@id": "https://accumeo.com/fragor&svar/#qapage",
                "url": "https://accumeo.com/fragor&svar",
                "name": `${seo?.title}`,
                "description": `${seo?.description}`,
            },
            {
                "@type": "ItemList",
                "itemListElement": listOfCategories,
            }
        ],


    })
}

export default makeFaqSchema