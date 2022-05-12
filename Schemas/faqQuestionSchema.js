const makeQuestionSchema = ({questionsList, question, seo}) => {
    let listOfQuestions = []
    const slug = question?.slug || ''

    const articleBody = removeTags(question?.answer) || ''

    if (questionsList && questionsList.length > 0) {
        listOfQuestions = questionsList?.map((el, i) => ({
                "@type": "ListItem",
                "position": `${i}`,
                "name": `${el?.question}`,
                "url": `https://accumeo.com/fragor&svar/${el?.slug}`
            })
        )
    }

    return ({
        "@context": "http://schema.org/",
        "@graph": [
            {
                "@type": "WebPage",
                "url": `https://accumeo.com/fragor&svar/${slug}`,
                "name": `${seo?.title}`,
                "description": `${seo?.description}`,
                "@id": "https://accumeo.com/fragor&svar/question/#webpage",
            },
            {
                "@type": "ItemList",
                "itemListElement": listOfQuestions,
                "isPartOf": {"@id": "https://accumeo.com/fragor&svar/question/#webpage"},
            },
            {
                "@type": "Article",
                "name": `${question.name}`,
                "articleBody": `${articleBody}`,
                "isPartOf": {"@id": "https://accumeo.com/fragor&svar/question/#webpage"},
            }
        ],
    })
}

const removeTags = (str) => {
    if ((str === null) || (str === ''))
        return false;
    else
        str = str.toString();
    return str.replace(/(<([^>]+)>)/ig, '');
}

export default makeQuestionSchema