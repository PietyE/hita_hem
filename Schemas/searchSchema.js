const makeSearchSchema = (data) => {
    return ({
        "@context": "http://schema.org/",
        "@type": "SearchResultsPage",
        "url": "https://accumeo.com/soksida",
        "name": `${data?.title}`,
        "description": `${data?.description}`,
    })
}

export default makeSearchSchema