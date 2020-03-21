import Head from 'next/head'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { useCallback, useState } from 'react'
import { CSSBaseline, ZEITUIProvider, useTheme } from 'components'
import ConfigContext from 'lib/components/config-provider'

const Application: NextPage<AppProps> = ({ Component, pageProps }) => {
  const theme = useTheme()
  const [themeType, setThemeType] = useState<typeof theme.type>(theme.type)
  const changeHandle = useCallback((isDark: boolean) => {
    setThemeType(isDark ? 'dark' : 'light')
  }, [])

  return (
    <>
      <Head>
        <title>React - ZEIT UI</title>
        <meta name="google" content="notranslate" />
        <meta name="twitter:creator" content="@echo_witt" />
        <meta name="referrer" content="strict-origin" />
        <meta property="og:title" content="React - ZEIT UI" />
        <meta property="og:url" content="https://react.zeit-ui.co" />
        <link rel="dns-prefetch" href="//react.zeit-ui.co" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="generator" content="ZEIT UI" />
        <meta name="description" content="React implementation for ZEIT design." />
        <meta property="og:description" content="React implementation for ZEIT design." />
        <meta property="og:image" content="https://user-images.githubusercontent.com/11304944/76085431-fd036480-5fec-11ea-8412-9e581425344a.png" />
        <meta property="twitter:image" content="https://user-images.githubusercontent.com/11304944/76085431-fd036480-5fec-11ea-8412-9e581425344a.png" />
        <meta name="viewport" content="initial-scale=1, maximum-scale=5, minimum-scale=1, viewport-fit=cover" />
      </Head>
      <ZEITUIProvider theme={{ type: themeType }}>
        <CSSBaseline />
        <ConfigContext onChange={changeHandle}>
          <Component {...pageProps} />
        </ConfigContext>
        <style global jsx>{`
          .tag {
            color: ${theme.palette.accents_5};
          }
          
          .punctuation {
            color: ${theme.palette.accents_5};
          }
          
          .attr-name {
            color: ${theme.palette.accents_6};
          }
          
          .attr-value {
            color: ${theme.palette.accents_4};
          }
          
          .language-javascript {
            color: ${theme.palette.accents_4};
          }
          
          span.class-name {
            color: ${theme.palette.warning};
          }
          
          span.maybe-class-name {
            color: ${theme.palette.purple};
          }
          
          span.token.string {
            color: ${theme.palette.accents_5};
          }
          
          span.keyword {
            color: ${theme.palette.success}
          }
          
          span.plain-text {
            color: ${theme.palette.accents_3};
          }
          
          body::-webkit-scrollbar {
            width: 0;
            background-color: ${theme.palette.accents_1};
          }
          
          body::-webkit-scrollbar-thumb {
            background-color: ${theme.palette.accents_2};
            border-radius: ${theme.layout.radius};
          }
      `}</style>
      </ZEITUIProvider>
    </>
  )
}

export default Application
