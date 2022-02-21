import React from "react";
const baseUrlSv = 'https//dev.accumeo.com/foretag/'
const baseUrlEn = 'https//dev.accumeo.com/en/company/'

const createDynamicMarkupForCampaigns = async () => {

    const response = await fetch(`https://dev-api.accumeo.com/api/companies/`)
    const data = await response.json()
    const listOfSlugs =   data.map((campaign=>campaign?.slug))
    const markup = listOfSlugs.map((slug) => {
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
    return markup.join('')
}

const Sitemap = () => {
    return null
};

export const getServerSideProps = async({res}) => {
    const markup = await createDynamicMarkupForCampaigns()

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
         <urlset
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        >
   <url>
    <loc>https://accumeo.com/</loc>
    <xhtml:link
            rel="alternate"
            hreflang="en"
            href="https://accumeo.com/en"/>
    <lastmod>2022-01-20T10:44:23+00:00</lastmod>
    <priority>1.00</priority>
</url>
<url>
<loc>https://accumeo.com/investeringsmojligheter</loc>
<xhtml:link
        rel="alternate"
        hreflang="en"
        href="https://accumeo.com/en/investment-opportunities"/>
<lastmod>2022-01-20T10:44:23+00:00</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>https://accumeo.com/sok-kapital</loc>
<xhtml:link
        rel="alternate"
        hreflang="en"
        href="https://accumeo.com/en/raise"/>
<lastmod>2022-01-20T10:44:23+00:00</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>https://accumeo.com/nyheter</loc>
<xhtml:link
        rel="alternate"
        hreflang="en"
        href="https://accumeo.com/en/news"/>
<lastmod>2022-01-20T10:44:23+00:00</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>https://accumeo.com/om-oss</loc>
<xhtml:link
        rel="alternate"
        hreflang="en"
        href="https://accumeo.com/en/about-us"/>
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
