import React from "react";
const baseUrlSv = `${process.env.NEXT_PUBLIC_SITEMAP_URL}/foretag/`
const baseUrlEn = `${process.env.NEXT_PUBLIC_SITEMAP_URL}/en/company/`

const categoryBaseUrlSv = `${process.env.NEXT_PUBLIC_SITEMAP_URL}/fragor&svar/`
const categoryBaseUrlEn = `${process.env.NEXT_PUBLIC_SITEMAP_URL}/en/faq/`

const createDynamicMarkup = async () => {

    const fetchCampaigns = await fetch(`${process.env.NEXT_PUBLIC_SITEMAP_API_URL}/api/companies/`,{
        headers:{
            'content-type': 'application/json',
            'origin': process.env.NEXT_PUBLIC_SITEMAP_URL
        },
    })

        const fetchCategories = await fetch(`${process.env.NEXT_PUBLIC_SITEMAP_API_URL}/api/faq-page-categories/`,{
        headers:{
            'content-type': 'application/json',
            'origin': process.env.NEXT_PUBLIC_SITEMAP_URL
        },
    })

    const campaigns = await fetchCampaigns.json()
    const listOfSlugs =   campaigns.map((campaign=>campaign?.slug))
    const campaignsMarkup = listOfSlugs.map((slug) => {
        return `
            <url>
              <loc>${baseUrlSv}${slug}</loc>
              <xhtml:link
               rel="alternate"
               hreflang="en"
               href="${baseUrlEn}${slug}"/>
              <lastmod>${new Date().toISOString()}</lastmod>
              <priority>0.80</priority>
            </url>
`
    })

    const categories = await fetchCategories.json()
    const listOfCategories =   categories.map((category=>category?.pk))
    const categoriesMarkup = listOfCategories.map((pk) => {
        return `
            <url>
              <loc>${categoryBaseUrlSv}${pk}</loc>
              <xhtml:link
               rel="alternate"
               hreflang="en"
               href="${categoryBaseUrlEn}${pk}"/>
              <lastmod>${new Date().toISOString()}</lastmod>
              <priority>0.80</priority>
            </url>
`
    })


    const dibPosts = await fetch(`https://api.dropinblog.com/v1/json/?b=${process.env.NEXT_PUBLIC_DIP_ID}`)
    const dibData = await dibPosts.json()
    const listOfDibSlugs = dibData?.data?.posts.map(post=>post?.slug)
    const dibMarkup = listOfDibSlugs.map((slug) => {
        return `
            <url>
              <loc>${process.env.NEXT_PUBLIC_SITEMAP_URL}/nyheter?p=${slug}</loc>
              <xhtml:link
               rel="alternate"
               hreflang="en"
               href="${process.env.NEXT_PUBLIC_SITEMAP_URL}/nyheter?p=${slug}"/>
              <lastmod>${new Date().toISOString()}</lastmod>
              <priority>0.80</priority>
            </url>
`
    })

    const markup = dibMarkup.concat(campaignsMarkup).concat(categoriesMarkup)

    return markup.join('')
}

const Sitemap = () => {
    return null
};

export const getServerSideProps = async({res}) => {
    const markup = await createDynamicMarkup()

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
         <urlset
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        >
   <url>
    <loc>${process.env.NEXT_PUBLIC_SITEMAP_URL}/</loc>
    <xhtml:link
            rel="alternate"
            hreflang="en"
            href="${process.env.NEXT_PUBLIC_SITEMAP_URL}/en"/>
    <lastmod>2022-01-20T10:44:23+00:00</lastmod>
    <priority>1.00</priority>
</url>
<url>
<loc>${process.env.NEXT_PUBLIC_SITEMAP_URL}/investeringsmojligheter</loc>
<xhtml:link
        rel="alternate"
        hreflang="en"
        href="${process.env.NEXT_PUBLIC_SITEMAP_URL}/en/investment-opportunities"/>
<lastmod>2022-01-20T10:44:23+00:00</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>${process.env.NEXT_PUBLIC_SITEMAP_URL}/sok-kapital</loc>
<xhtml:link
        rel="alternate"
        hreflang="en"
        href="${process.env.NEXT_PUBLIC_SITEMAP_URL}/en/raise"/>
<lastmod>2022-01-20T10:44:23+00:00</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>${process.env.NEXT_PUBLIC_SITEMAP_URL}/nyheter</loc>
<xhtml:link
        rel="alternate"
        hreflang="en"
        href="${process.env.NEXT_PUBLIC_SITEMAP_URL}/en/news"/>
<lastmod>2022-01-20T10:44:23+00:00</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>${process.env.NEXT_PUBLIC_SITEMAP_URL}/om-oss</loc>
<xhtml:link
        rel="alternate"
        hreflang="en"
        href="${process.env.NEXT_PUBLIC_SITEMAP_URL}/en/about-us"/>
<lastmod>2022-01-20T10:44:23+00:00</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>${process.env.NEXT_PUBLIC_SITEMAP_URL}/fragor&svar</loc>
<xhtml:link
        rel="alternate"
        hreflang="en"
        href="${process.env.NEXT_PUBLIC_SITEMAP_URL}/en/faq"/>
<lastmod>2022-01-20T10:44:23+00:00</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>${process.env.NEXT_PUBLIC_SITEMAP_URL}/soksida</loc>
<xhtml:link
        rel="alternate"
        hreflang="en"
        href="${process.env.NEXT_PUBLIC_SITEMAP_URL}/en/search"/>
<lastmod>2022-01-20T10:44:23+00:00</lastmod>
<priority>0.80</priority>
</url>
${markup}
    </urlset>
  `;

    res.setHeader("Content-Type", "application/xml");
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
};

export default Sitemap;
