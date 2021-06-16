import "../styles/globals.css";
import "../src/components/richImageUploader/quill.imageUploader.css";
import Head from "next/head";
import { DefaultSeo } from "next-seo";
import { ApolloProvider } from "@apollo/client";
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import { ThemeProvider } from "theme-ui";
import theme from "../src/utils/theme-ui";
import NextNprogress from "nextjs-progressbar";
import { client } from "../src/apollo/client";
import SEO from "../next-seo.config";

function getLibrary(provider) {
  return new Web3Provider(provider);
}

function MyApp({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <NextNprogress
        color={theme.colors.primary}
        startPosition={0.3}
        stopDelayMs={200}
        height="3"
      />
      <Head>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>{" "}
        {/* Autopilot */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(o){var b="https://speedyfox.io/anywhere/",t="d7a64f71ff094b21890b3c44d1e568e895a0d71affc14ed79923afe6c341ccfd",a=window.AutopilotAnywhere={_runQueue:[],run:function(){this._runQueue.push(arguments);}},c=encodeURIComponent,s="SCRIPT",d=document,l=d.getElementsByTagName(s)[0],p="t="+c(d.title||"")+"&u="+c(d.location.href||"")+"&r="+c(d.referrer||""),j="text/javascript",z,y;if(!window.Autopilot) window.Autopilot=a;if(o.app) p="devmode=true&"+p;z=function(src,asy){var e=d.createElement(s);e.src=src;e.type=j;e.async=asy;l.parentNode.insertBefore(e,l);};y=function(){z(b+t+'?'+p,true);};if(window.attachEvent){window.attachEvent("onload",y);}else{window.addEventListener("load",y,false);}})({"app":true});`,
          }}
        ></script>
      </Head>
      <ThemeProvider theme={theme}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <ApolloProvider client={client}>
            <Component {...pageProps} />
          </ApolloProvider>
        </Web3ReactProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
