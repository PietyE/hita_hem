import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Head from "next/head";

import "i18n";
import "../styles/index.scss";

import { wrapper } from "redux/store";
import { bootstap } from "redux/actions/user";
import RootPage from "components/RootPage";

function App({ Component, pageProps }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(bootstap());
  }, []);

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
