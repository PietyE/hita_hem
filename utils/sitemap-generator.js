const fs = require('fs')

async function generateSitemap() {
    const baseUrlSv = `https//${process.env.NEXT_PUBLIC_SITEMAP_URL}/foretag/`
    const baseUrlEn = `https//${process.env.NEXT_PUBLIC_SITEMAP_URL}/en/company/`
    const createDynamicMarkupForCampaigns = async () => {

        const response = await fetch(`https://${process.env.NEXT_PUBLIC_SITEMAP_API_URL}/api/companies/`)
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
    <loc>https://${process.env.NEXT_PUBLIC_SITEMAP_URL}/</loc>
    <xhtml:link
            rel="alternate"
            hreflang="en"
            href="https://${process.env.NEXT_PUBLIC_SITEMAP_URL}/en"/>
    <lastmod>2022-01-20T10:44:23+00:00</lastmod>
    <priority>1.00</priority>
</url>
<url>
<loc>https://${process.env.NEXT_PUBLIC_SITEMAP_URL}/investeringsmojligheter</loc>
<xhtml:link
        rel="alternate"
        hreflang="en"
        href="https://${process.env.NEXT_PUBLIC_SITEMAP_URL}/en/investment-opportunities"/>
<lastmod>2022-01-20T10:44:23+00:00</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>https://${process.env.NEXT_PUBLIC_SITEMAP_URL}/sok-kapital</loc>
<xhtml:link
        rel="alternate"
        hreflang="en"
        href="https://${process.env.NEXT_PUBLIC_SITEMAP_URL}/en/raise"/>
<lastmod>2022-01-20T10:44:23+00:00</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>https://${process.env.NEXT_PUBLIC_SITEMAP_URL}/nyheter</loc>
<xhtml:link
        rel="alternate"
        hreflang="en"
        href="https://${process.env.NEXT_PUBLIC_SITEMAP_URL}/en/news"/>
<lastmod>2022-01-20T10:44:23+00:00</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>https://${process.env.NEXT_PUBLIC_SITEMAP_URL}/om-oss</loc>
<xhtml:link
        rel="alternate"
        hreflang="en"
        href="https://${process.env.NEXT_PUBLIC_SITEMAP_URL}/en/about-us"/>
<lastmod>2022-01-20T10:44:23+00:00</lastmod>
<priority>0.80</priority>
</url>
${markup}
    </urlset>
  `;



    fs.writeFileSync('public/sitemap.xml', sitemap)
}
generateSitemap()