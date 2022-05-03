const makeFaqSchema = (categories) => {

    let listOfCategories = []


    if(listOfCategories && listOfCategories.length > 0){
        listOfCategories = categories.map((el, i) => ({
                "@type":"ListItem",
                "position":`${i}`,
                "url":`https://accumeo.com/fragor&svar/${el.pk}`
            })
        )
    }

    return ({
        "@context": "http://schema.org/",
        "@graph": [
            {
                "@type": "QAPage",
                "@id": "https://accumeo.com/fragor/#qapage",
                "url": "https://accumeo.com/fragor&svar",
                "name": "FRÅGOR & SVAR",
                "description": "",
            },
            {
                "@type":"ItemList",
                "isPartOf": {"@id": "https://accumeo.com/fragor/#qapage"},
                "itemListElement":listOfCategories,
            }
],


    })
}

export default makeFaqSchema