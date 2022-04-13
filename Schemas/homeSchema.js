const makeHomePageSchema = (data) => {
    let title = ''
    let description = ''
    if(data?.banner_images && Array.isArray(data?.banner_images) && data?.banner_images.length>0){
        title = data?.banner_images[0].title
        description = data?.banner_images[0].description
    }
    return({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Home page",
        "title": `${title}`,
        "description": `${description}`,
        // "type": "HowTo",


    })

}

export default makeHomePageSchema