const makeQuestionSchema = (data) => {
    let listOfQuestions = []

    const title = data?.question?.category?.title || ''
    const slug = data?.question?.slug || ''

    if(data?.questionsList && data?.questionsList.length > 0){
        listOfQuestions = data?.questionsList?.map((el, i) => ({
                "@type":"ListItem",
                "position":`${i}`,
                "name":`${el?.question}`,
                "url": `https://accumeo.com/fragor&svar/${el?.slug}`
            })
        )
    }

    return ({
        "@context": "http://schema.org/",
        "@graph": [
            {
                "@type": "webpage",
                "url": `https://accumeo.com/fragor&svar/${slug}`,
                "name": `${title}`,
                "description": "",
            },
            {
                "@type":"ItemList",
                "itemListElement":listOfQuestions,
                "@id": "https://accumeo.com/fragor/#webpage",
            },
            {

            }
        ],
    })
}

export default makeQuestionSchema