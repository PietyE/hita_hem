const makeCategoriesSchema = (data) => {

    let listOfAnswers = []

    const title = Array.isArray(data) && data.length > 0 ? data[0].category.title : ''
    const id = Array.isArray(data) && data.length > 0 ? data[0].category?.pk : ''

    if(listOfAnswers && listOfAnswers.length > 0){
        listOfAnswers = data.map((el, i) => ({
                "@type":"ListItem",
                "position":`${i}`,
                "name":`${el.question}`
            })
        )
    }

    return ({
        "@context": "http://schema.org/",
        "@graph": [
            {
                "@type": "webpage",
                "url": `https://accumeo.com/fragor&svar/${id}`,
                "name": `${title}`,
                "description": "",
            },
            {
                "@type":"ItemList",
                "itemListElement":listOfAnswers,
                "@id": "https://accumeo.com/fragor/#webpage",
            },
            {

            }
        ],
    })
}

export default makeCategoriesSchema