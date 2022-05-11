const makeRaiseSchema = (data) =>{
return(
    {
        "@type": "WebPage",
        "url": "https://accumeo.com/sok-kapital",
        "name": `${data?.title}`,
        "description": `${data?.description}`,
    }
)
}

export default makeRaiseSchema