import React from 'react';
import Head from "next/head";

function MetaTags({seo}) {
    return (
        <Head>
            {seo?.seo_title && <title>{seo?.seo_title}</title>}
            {seo?.seo_description && <meta name = "description" content = {seo?.seo_description}/>}
            {seo?.social?.title && <meta property = "og:title" content = {seo?.social?.title}/>}

            {seo?.social?.description && <meta property = "og:description" content = {seo?.social?.description}/>}

            {seo?.social?.image && (
                <meta property="og:image" content= {seo?.social?.image} />

            )}
            </Head>
    );
}

export default MetaTags;