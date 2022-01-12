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



            {/* Global Site Tag (gtag.js) - Google Analytics */}

            {/*<script*/}
            {/*    async*/}
            {/*    src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}*/}
            {/*    strategy="afterInteractive"*/}
            {/*/>*/}
          {/*  <script*/}
          {/*      strategy="afterInteractive"*/}
          {/*      dangerouslySetInnerHTML={{*/}
          {/*          __html: `*/}
          {/*  window.dataLayer = window.dataLayer || [];*/}
          {/*  function gtag(){dataLayer.push(arguments);}*/}
          {/*  gtag('js', new Date());*/}
          {/*  gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {*/}
          {/*    page_path: window.location.pathname,*/}
          {/*  });*/}
          {/*`,*/}
          {/*      }}*/}
          {/*  />*/}
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
