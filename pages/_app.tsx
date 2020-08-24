import Head from 'next/head'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import React, { useEffect, useState } from 'react'
import { CssBaseline, GeistProvider, useTheme, GeistUIThemes } from 'components'
import Menu from 'lib/components/menu'
import ConfigContext from 'lib/config-provider'
import useDomClean from 'lib/use-dom-clean'
import { DeepPartial } from 'components/utils/types'

const Application: NextPage<AppProps<{}>> = ({ Component, pageProps }) => {
  const theme = useTheme()
  const [customTheme, setCustomTheme] = useState<DeepPartial<GeistUIThemes>>({})
  const themeChangeHandle = (theme: DeepPartial<GeistUIThemes>) => {
    setCustomTheme(theme)
  }

  useEffect(() => {
    const theme = window.localStorage.getItem('theme')
    if (theme !== 'dark') return
    themeChangeHandle({ type: 'dark' })
  }, [])
  useDomClean()

  return (
    <>
      <Head>
        <title>React - Geist UI</title>
        <meta name="google" content="notranslate" />
        <meta name="twitter:creator" content="@echo_witt" />
        <meta name="referrer" content="strict-origin" />
        <meta property="og:title" content="React - Geist UI" />
        <meta property="og:url" content="https://react.geist-ui.dev" />
        <link rel="dns-prefetch" href="//react.geist-ui.dev" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="generator" content="Geist UI" />
        <meta name="description" content="React implementation for Geist design." />
        <meta property="og:description" content="React implementation for Geist design." />
        <meta
          itemProp="image"
          property="og:image"
          content="https://user-images.githubusercontent.com/11304944/76085431-fd036480-5fec-11ea-8412-9e581425344a.png"
        />
        <meta
          property="og:image"
          content="https://user-images.githubusercontent.com/11304944/76085431-fd036480-5fec-11ea-8412-9e581425344a.png"
        />
        <meta
          property="twitter:image"
          content="https://user-images.githubusercontent.com/11304944/76085431-fd036480-5fec-11ea-8412-9e581425344a.png"
        />
        <meta
          name="viewport"
          content="initial-scale=1, maximum-scale=1, minimum-scale=1, viewport-fit=cover"
        />
      </Head>
      <GeistProvider theme={customTheme}>
        <CssBaseline />
        <ConfigContext onThemeChange={themeChangeHandle}>
          <Menu />
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
            color: ${theme.palette.success};
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
      </GeistProvider>
    </>
  )
}

export default Application
