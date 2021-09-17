import { useEffect } from "react";
import { useDispatch } from "react-redux";

import "i18n";
import "../styles/index.scss";
//import App from "next/app";
import { END } from "redux-saga";
import { wrapper } from "redux/store";
import RootPage from "components/RootPage";

import { bootstap } from "redux/actions/user";

function App({ Component, pageProps }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(bootstap());
  }, []);

  return (
    <RootPage>
      <Component {...pageProps} />
    </RootPage>
  );
}

export default wrapper.withRedux(App);

// class MyApp extends App {
//   static getInitialProps = wrapper.getInitialAppProps(
//     (store) =>
//       async ({ Component, ctx }) => {
//         console.log("________!!!!!!!!MyAppMyAppMyAppMyApp");
//         store.dispatch(bootstap());
//         store.dispatch(END);
//         await store.sagaTask.toPromise();
//         return {
//           pageProps: {
//             // Call page-level getInitialProps
//             // DON'T FORGET TO PROVIDE STORE TO PAGE
//             ...(Component.getInitialProps
//               ? await Component.getInitialProps({ ...ctx, store })
//               : {}),
//             // Some custom thing for all pages
//             pathname: ctx.pathname,
//           },
//         };
//       }
//   );

//   render() {
//     const { Component, pageProps } = this.props;

//     return <Component {...pageProps} />;
//   }
// }

// export default wrapper.withRedux(MyApp);
