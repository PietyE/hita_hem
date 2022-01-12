import Document, { Html, Head, Main, NextScript } from "next/document";
import React from "react";
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
          <link
              href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"
              rel="stylesheet"
          />

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
