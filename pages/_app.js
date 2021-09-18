import Head from "next/head";

import "i18n";
import "../styles/index.scss";

import { wrapper } from "redux/store";
import RootPage from "components/RootPage";

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Accumeo Next JS</title>
      </Head>
      <RootPage>
        <Component {...pageProps} />
      </RootPage>
    </>
  );
}

export default wrapper.withRedux(App);
