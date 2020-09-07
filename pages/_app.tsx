import Head from 'next/head'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import React, { useEffect, useState } from 'react'
import { CssBaseline, CfxProvider, useTheme, CfxUIThemes } from 'components'
import Menu from 'lib/components/menu'
import ConfigContext from 'lib/config-provider'
import useDomClean from 'lib/use-dom-clean'
import { DeepPartial } from 'components/utils/types'

const Application: NextPage<AppProps<{}>> = ({ Component, pageProps }) => {
  const theme = useTheme()
  const [customTheme, setCustomTheme] = useState<DeepPartial<CfxUIThemes>>({})
  const themeChangeHandle = (theme: DeepPartial<CfxUIThemes>) => {
    setCustomTheme(theme)
  }
  const router = useRouter()

  useEffect(() => {
    const theme = window.localStorage.getItem('theme')
    if (theme !== 'dark') return
    themeChangeHandle({ type: 'dark' })
  }, [])
  useDomClean()

  return (
    <>
      <Head>
        <title>React - CFX UI</title>
        <meta name="google" content="notranslate" />
        <meta name="twitter:creator" content="@echo_witt" />
        <meta name="referrer" content="strict-origin" />
        <meta property="og:title" content="React - CFX UI" />
        <meta property="og:url" content="https://conflux-react-ui.vercel.app" />
        <link rel="dns-prefetch" href="//conflux-react-ui.vercel.app" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="generator" content="CFX UI" />
        <meta name="description" content="React implementation for CFX design." />
        <meta property="og:description" content="React implementation for CFX design." />
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
      <CfxProvider theme={customTheme}>
        <CssBaseline />
        <ConfigContext onThemeChange={themeChangeHandle}>
          {!router.pathname.startsWith('/code') && <Menu />}
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
            border-radius: ${theme.expressiveness.R2};
          }
          .content {
            overflow: hidden;
            overflow-x: scroll;
          }
        `}</style>
      </CfxProvider>
    </>
  )
}

export default Application
