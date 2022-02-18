import React from "react";

const Sitemap = () => {
};

export const getServerSideProps = async({res}) => {
    const baseUrlSv = 'https//accumeo.com/foretag/'
    const baseUrlEn = 'https//accumeo.com/en/company/'
    const createDynamicMarkupForCampaigns = async () => {

        const response = await fetch(`https://api.accumeo.com/api/companies/`)
        const data = await response.json()
        const listOfSlugs =   data.map((campaign=>campaign?.slug))
        const markup = listOfSlugs.map((slug) => {
            return `
            <url>
              <loc>${baseUrlSv}${slug}</loc>
          
              <lastmod>${new Date().toISOString()}</lastmod>
              <priority>0.80</priority>
            </url>
`
        })
        return markup.join('')
    }
    const markup = await createDynamicMarkupForCampaigns()


    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
         <urlset
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
   <url>
    <loc>https://accumeo.com/</loc>
    <lastmod>2022-01-20T10:44:23+00:00</lastmod>
    <priority>1.00</priority>
</url>
<url>
<loc>https://accumeo.com/investeringsmojligheter</loc>
<lastmod>2022-01-20T10:44:23+00:00</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>https://accumeo.com/sok-kapital</loc>
<lastmod>2022-01-20T10:44:23+00:00</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>https://accumeo.com/nyheter</loc>
<lastmod>2022-01-20T10:44:23+00:00</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>https://accumeo.com/om-oss</loc>
<lastmod>2022-01-20T10:44:23+00:00</lastmod>
<priority>0.80</priority>
</url>
${markup}
    </urlset>
  `;

    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
};

export default Sitemap;