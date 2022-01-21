import Document, { Html, Head, Main, NextScript } from "next/document";
import React from "react";
import Script from "next/script";
class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <link rel="manifest" href="/manifest.json" />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.ico"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="128x128"
            href="/favicon-128x128.ico"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.ico"
          />


          <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
          />
          <link
              href="https://fonts.googleapis.com/css2?family=Quicksand:wght@700&display=swap"
              rel="stylesheet"
          />
            <Script>
                window.dataLayer = window.dataLayer || [];
            </Script>
            <Script
                id="start_gtag"
                dangerouslySetInnerHTML={{
                    __html: `
     (function(w,d,s,l,i){
                const w[l]=w[l]||[];
                w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});
                const f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5PSZPK5');
  `,
                }}
            />
            <noscript
                id="gtag_noscript"
                dangerouslySetInnerHTML={{
                    __html: ` <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5PSZPK5"
                    height="0" width="0" style="display:none;visibility:hidden"></iframe>
                            `}}/>

        </Head>
        <body>

          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
