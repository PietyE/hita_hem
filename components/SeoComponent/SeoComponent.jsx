import React from "react";
import Head from "next/head";

const SeoComponent = ({ seo, url, makeSchema, data, keyName }) => {
  return (
    <Head>
      {seo?.seo_title && <title>{seo?.seo_title}</title>}
      {seo?.seo_description && (
        <meta name="description" content={seo?.seo_description} />
      )}

      <meta property="og:type" content="website" />
      {seo?.social?.title && (
        <meta name="title" property="og:title" content={seo?.social?.title} />
      )}
      {seo?.social?.description && (
        <meta
          name="description"
          property="og:description"
          content={seo?.social?.description}
        />
      )}
      {seo?.social?.image && (
        <meta name="image" property="og:image" content={seo?.social?.image} />
      )}
      {url && <meta property="og:url" content={url} />}
      <meta property="og:locale" content="sv_SE" />
      <meta property="og:locale:alternate" content="en_US" />

      <meta name="twitter:card" content="summary" />
      {url && <meta name="twitter:site" content={url} />}
      {seo?.social?.title && (
        <meta name="twitter:title" content={seo?.social?.title} />
      )}
      {seo?.social?.image && (
        <meta name="twitter:image" content={seo?.social?.image} />
      )}
      {seo?.social?.description && (
        <meta name="twitter:description" content={seo?.social?.description} />
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(makeSchema(data)) }}
        key={keyName}
      />
    </Head>
  );
};

export default SeoComponent;


const HOC = () => {
	const = useLo
		return <div>
			pizda
		</div>
}
