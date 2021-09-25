import Head from "next/head";
import NextCookies from "next-cookies";
import universalLanguageDetect from "@unly/universal-language-detector";
import api from "api";
import get from "lodash/get";
import Cookies from "js-cookie";

import "i18n";
import "../styles/index.scss";

import { wrapper } from "redux/store";
import RootPage from "components/RootPage";

function App({ Component, pageProps }) {
  const initLang = pageProps?._cookies?.i18next || Cookies.get("i18next");

  console.log("App _cookies", _cookies);

  return (
    <>
      <Head>
        <title>Accumeo Next JS</title>
      </Head>
      <RootPage initLang={initLang}>
        <Component {...pageProps} />
      </RootPage>
    </>
  );
}

App.getInitialProps = wrapper.getInitialAppProps(
  (store) =>
    async ({ Component, ctx }) => {
      const { req } = ctx;
      const cookies = NextCookies(ctx);

      const lang = universalLanguageDetect({
        supportedLanguages: ["en", "sv"],
        fallbackLanguage: "en", // Fallback language in case the user's language cannot be resolved
        acceptLanguageHeader: get(req, "headers.accept-language"), // Optional - Accept-language header will be used when resolving the language on the server side
        serverCookies: cookies, // Optional - Cookie "i18next" takes precedence over navigator configuration (ex: "i18next: fr"), will only be used on the server side
        errorHandler: (error) => {
          // Optional - Use you own logger here, Sentry, etc.
          console.log("Custom error handler:");
          console.error(error);
        },
      });

      api.setLanguage(lang);

      return {
        pageProps: {
          // Call page-level getInitialProps
          // DON'T FORGET TO PROVIDE STORE TO PAGE
          ...(Component.getInitialProps
            ? await Component.getInitialProps({ ...ctx, store })
            : {}),
          _cookies: cookies,
          pathname: ctx.pathname,
        },
      };
    }
);

export default wrapper.withRedux(App);
