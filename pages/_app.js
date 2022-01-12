import Head from "next/head";
import api from "api";
import Script from 'next/script'
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
        <Script>
            {` window.intercomSettings = {
    app_id: "${process.env.NEXT_PUBLIC_INTERCOM_APP_ID}",
    language_override: '${initLang}' || 'sv',
  };`}
        </Script>
        <Script
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
                __html: `
(function(){const w=window;
const ic=w.Intercom;
if(typeof ic==="function"){
ic('reattach_activator');
ic('update',w.intercomSettings);
}else{const d=document;
const i=function(){i.c(arguments);
};
i.q=[];
i.c=function(args){i.q.push(args);
};
w.Intercom=i;
const l=function(){const s=d.createElement('script');
s.type='text/javascript';
s.async=true;
s.src='https://widget.intercom.io/widget/${process.env.NEXT_PUBLIC_INTERCOM_APP_ID}';
const x=d.getElementsByTagName('script')[0];
x.parentNode.insertBefore(s,x);
};
if(document.readyState==='complete'){l();
}else if(w.attachEvent){w.attachEvent('onload',l);
}else{w.addEventListener('load',l,false);
}}})();

  `,
            }}
        />

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
