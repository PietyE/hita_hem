import Head from "next/head";
import api from "api";

import "i18n";
import "../styles/index.scss";

import { wrapper } from "redux/store";
import RootPage from "components/RootPage";

function App({ Component, pageProps }) {
  const initLang = pageProps?.initialLang;

  return (
    <>
      <Head>
        <title>Accumeo - Investera i onoterade tillväxtbolag idag</title>
          <meta name="description" content="Accumeo gör delägarskap i onoterade bolag åtkomligt för fler genom gräsrotsfinansiering" />

      </Head>
      <RootPage initLang={initLang}>
        <Component {...pageProps} />
      </RootPage>
    </>
  );
}

App.getInitialProps = wrapper.getInitialAppProps(() => async ({ ctx }) => {
  const locale = ctx.locale;

  api.setLanguage(locale);

  return {
    pageProps: {
      initialLang: locale,
    },
  };
});

export default wrapper.withRedux(App);
