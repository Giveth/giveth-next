import '../styles/globals.css'
import '../src/components/richImageUploader/quill.imageUploader.css'
import { DefaultSeo } from 'next-seo'
import { ApolloProvider } from '@apollo/client'
// import { Web3Provider } from '@ethersproject/providers'
// import { Web3ReactProvider } from '@web3-react/core'
import { ThemeProvider } from 'theme-ui'
import theme from '../src/utils/theme-ui'
import NextNprogress from 'nextjs-progressbar'
import { useApollo } from '../src/apollo/client'
import SEO from '../next-seo.config'
import OnboardJS from '../src/contextProvider/Web3Provider'

// function getLibrary (provider) {
//   return new Web3Provider(provider)
// }

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps)

  return (
    <>
      <DefaultSeo {...SEO} />
      <NextNprogress
        color={theme.colors.primary}
        startPosition={0.3}
        stopDelayMs={200}
        height='3'
      />
      <OnboardJS>
        <ThemeProvider theme={theme}>
        {/* <Web3ReactProvider getLibrary={getLibrary}> */}
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
        {/* </Web3ReactProvider> */}
      </ThemeProvider>
      </OnboardJS>
    </>
  )
}

export default MyApp
